import Alert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import ErrorBar from '../components/ErrorBar';
import React from "react";
import SpotifyWebApi from 'spotify-web-api-node';
import TextField from '@material-ui/core/TextField';
import { Container, Grid } from '@material-ui/core'
import { Session } from 'next-auth/client';
import { getSession } from 'next-auth/client';

type ITrackDetailProps = {
    id: string
}

type ITrackDetailState = {
    error: string,
    isMoving: boolean,
    selectedPlaylistId: string,
    track: SpotifyApi.TrackObjectFull,
    trackName: string,
    userPlaylists: any
}

class TrackDetail extends React.Component<ITrackDetailProps, ITrackDetailState> {
    session: Session;

    state: ITrackDetailState = {
        error: null,
        isMoving: false,
        selectedPlaylistId: null,
        track: null,
        trackName: "",
        userPlaylists: null,
    }

    public async componentDidMount() {

        this.session = await getSession();
        if (this.session) {
            const spotifyApi = new SpotifyWebApi({
                accessToken: this.session.accessToken
            });
            Promise.all([
                spotifyApi.getTrack(this.props.id),
                spotifyApi.getUserPlaylists({
                    limit: 50
                })
            ]).then((data) => {
                const [track, userPlaylists] = data
                this.setState({
                    track: track.body,
                    trackName: track.body.name,
                    userPlaylists: userPlaylists.body.items
                });
            }).catch((error)  => {
                this.setState({error: error.message});
            });
        }
    }

    public async move(event) {
        event.preventDefault();
        try {
            this.setState({isMoving: true});
            const spotifyApi = new SpotifyWebApi({
                accessToken: this.session.accessToken
            });
            await Promise.all([
                spotifyApi.addTracksToPlaylist(
                    this.state.selectedPlaylistId,
                    [`spotify:track:${this.state.track.id}`]
                ),
                spotifyApi.addTracksToPlaylist(
                    '0bqbsodJUzyovsAMUonkND',
                    [`spotify:track:${this.state.track.id}`]
                ),
            ]);
            await spotifyApi.removeFromMySavedTracks([this.state.track.id])
        } catch (err) {
            this.setState({error: err.meesage});
            debugger;
        } finally {
            this.setState({isMoving: false});
        }
    }

    public onInputChange(event, newValue) {
        let selectedPlaylistId = null;
        if (newValue !== null) {
            selectedPlaylistId = newValue.id
        }
        this.setState({selectedPlaylistId: selectedPlaylistId});
    }

    public googleTrackGenre() {
        if (this.state.track != null) {
            const artists = this.state.track.artists.reduce((acc, value)=>`${value.name}, ${acc}`, '');
            return `/api/google-search?q=${encodeURIComponent(`${this.state.track.name} ${artists} genre`)}`;
        }
    }

    render() {
        return (
            <>
                <ErrorBar error={this.state.error}/>
                <Container>
                    <form onSubmit={this.move.bind(this)} >
                        <Grid container>
                            <Grid item xs={4}>
                                <p>{this.state.trackName}</p>
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
                                    id="playlists"
                                    options={this.state.userPlaylists}
                                    getOptionLabel={(playlist: SpotifyApi.PlaylistBaseObject) => playlist.name}
                                    onChange={this.onInputChange.bind(this)}
                                    renderInput={(params) => <TextField {...params} label="playlists" margin="normal" />}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained" color="primary" type="submit" disabled={this.state.selectedPlaylistId === null || this.state.isMoving}>Move</Button>
                            </Grid>
                        </Grid>
                    </form>
                    <iframe src={this.googleTrackGenre()} width="100%"/>
                </Container>
            </>
        );
    }
}

export default TrackDetail
