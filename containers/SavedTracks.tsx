import Container from '@material-ui/core/Container';
import ErrorBar from '../components/ErrorBar';
import React from "react";
import SavedTracksGrid from '../components/SavedTracksGrid'
import SavedTracksList from '../components/SavedTracksList'
import SpotifyWebApi from 'spotify-web-api-node';
import { getSession, Session } from 'next-auth/client';

interface ISavedTracksProps {
}

interface ISavedTracksState {
    savedTracks: SpotifyApi.SavedTrackObject[]
    error: string
    loadingTracks: boolean
}

class SavedTracks extends React.Component<ISavedTracksProps, ISavedTracksState> {
    public async componentDidMount() {
        const session = await getSession();
        if (session) {
            const spotifyApi = new SpotifyWebApi({
                accessToken: session.accessToken
            });
            try {
                this.setState({loadingTracks: true})
                const savedTracks = await spotifyApi.getMySavedTracks({
                    limit : 50,
                    offset: 1
                });
                this.setState({savedTracks: savedTracks.body.items});
            } catch (error) {
                this.setState({error: error.message});
            } finally {
                this.setState({loadingTracks: false})
            }
        }
    }

    public state = {
        error: null,
        savedTracks: [],
        loadingTracks: false
    };

    render() {
        return (
            <Container>
                <SavedTracksGrid loadingTracks={this.state.loadingTracks} savedTracks={this.state.savedTracks}/>
            </Container>
        );
    }
}

export default SavedTracks
