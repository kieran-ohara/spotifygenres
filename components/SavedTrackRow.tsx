import Button from '@material-ui/core/Button';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function SavedTrackRow(props: any) {
    const artists = props.track.artists.reduce((acc, value)=>`${value.name}, ${acc}`, '');

    return (
        <React.Fragment key={props.track.id+'this'}>
            <TableRow key={props.track.id + 'table'}>
                <TableCell key={props.track.id + '1'}>{props.track.name}</TableCell>
                <TableCell key={props.track.id + '2'}>{artists}</TableCell>
                <TableCell key={props.track.id + '3'}>{props.addedat}</TableCell>
                <TableCell key={props.track.id + 'action'}>
                    <Button color="primary" onClick={props.onTrackDetail}>Move</Button>
                    <Button color="primary" onClick={props.onPlay}>Play</Button>
                    <Button color="secondary" onClick={props.onDelete}>Delete</Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
