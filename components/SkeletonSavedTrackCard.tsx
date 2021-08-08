
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import { PlayArrow, Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function SavedTrackCard (props: any) {
    const classes = useStyles();

    return (
        <>
            <Card>
                <CardActionArea onClick={props.onTrackDetail}>
                    <Skeleton animation="wave" variant="rect" className={classes.media} />
                    <CardContent>
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={10} width="80%" />
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Skeleton animation="wave" variant="circle" width={16} height={16} />
                    <Skeleton animation="wave" variant="circle" width={16} height={16} />
                </CardActions>
            </Card>
        </>
    )
}
