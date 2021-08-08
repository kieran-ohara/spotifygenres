import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import SavedTrack from '../containers/SavedTrack';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export default function SavedTracksList(props: any) {
    if (props.savedTracks.length == 0) {
        return <Alert severity="warning">No Tracks Provided!</Alert>
    }

    function sortAddedAtDescending(a, b) {
        const [aAddedAt, bAddedAt] = [a,b].map(value => new Date(value.added_at));
        const result = aAddedAt.valueOf() - bAddedAt.valueOf();
        return result;
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Track Name</TableCell>
                            <TableCell>Artists</TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={true}
                                    direction="desc"
                                >
                                    Added At
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.savedTracks.sort(sortAddedAtDescending).map((row) => (
                            <SavedTrack track={row.track} addedat={row.added_at}></SavedTrack>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
