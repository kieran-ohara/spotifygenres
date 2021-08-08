import SavedTrackCard from '../components/SavedTrackCard';
import SpotifyWebApi from 'spotify-web-api-node';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router'

export default function SavedTrack(props: any) {
    const router = useRouter()
    const artists = props.track.artists.reduce((acc, value)=>`${value.name}, ${acc}`, '');

    async function play() {
        const session = await getSession();
        if (session) {
            var myHeaders = new Headers();
            myHeaders.append('Authorization', 'Bearer ' + session.accessToken);

            var myInit = {
                method: 'PUT',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: new Blob([JSON.stringify({uris: [`spotify:track:${props.track.id}`]})])
            };

            // @ts-ignore
            const myRequest = new Request('https://api.spotify.com/v1/me/player/play', myInit);

            fetch(myRequest).then(function(response) {});
        }
    }

    async function deleteTrack() {
        const session = await getSession();
        if (session) {
            const spotifyApi = new SpotifyWebApi({
                accessToken: session.accessToken
            });
            try {
                await spotifyApi.removeFromMySavedTracks([props.track.id]);
                location.reload();
            } catch (error) {
                alert({error: error.message});
            }
        }
    }

    function trackDetail() {
        router.push(`/track/${props.track.id}`);
    }

    return (
        <>
            <SavedTrackCard
                onDelete={deleteTrack}
                onPlay={play}
                onTrackDetail={trackDetail}
                track={props.track}
                addedat={props.addedat}
            />
        </>
    )
}
