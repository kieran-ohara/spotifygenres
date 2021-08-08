import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

export default function AppDrawer() {
    return (
        <>
            <AppBar position="static">
                <Link href="/">
                    <Toolbar>
                        <Typography variant="h6">Spotify Genres</Typography>
                    </Toolbar>
                </Link>
            </AppBar>
        </>
    )
}
