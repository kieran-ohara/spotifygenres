import Grid from '@material-ui/core/Grid';
import React from 'react';
import SavedTrack from '../containers/SavedTrack';
import SkeletonSavedTrackCard from './SkeletonSavedTrackCard';
import { useRouter } from 'next/router'

export default function SavedTracksGrid(props: any) {
    function sortAddedAtDescending(a, b) {
        const [aAddedAt, bAddedAt] = [a,b].map(value => new Date(value.added_at));
        const result = aAddedAt.valueOf() - bAddedAt.valueOf();
        return result;
    }

    if (props.loadingTracks == true) {
        return (
            <Grid container spacing={2}>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map((entry) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                        <SkeletonSavedTrackCard/>
                    </Grid>
                ))}
            </Grid>
        )
    }

    return (
        <>
            <Grid container spacing={2}>
                {props.savedTracks.sort(sortAddedAtDescending).map((tile) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                        <SavedTrack track={tile.track} addedat=""/>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
