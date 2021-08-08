import AppBar from '../components/AppBar';
import SavedTracks from '../containers/SavedTracks';
import SpotifyWebApi from 'spotify-web-api-node';
import { signIn } from 'next-auth/client'
import { useSession } from 'next-auth/client';

export default function Component(props) {
    const [ session, loading ] = useSession()

    if (loading) {
        return (
            <>
                <AppBar/>
                <p>Loading</p>
            </>
        )
    }

    if (!loading && !session) {
        signIn();
    }

    return (
        <>
            <AppBar/>
            <SavedTracks/>
        </>
    )
}
