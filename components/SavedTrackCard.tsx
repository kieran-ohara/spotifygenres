import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
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
                    <CardMedia image={props.track.album.images[0].url} className={classes.media}></CardMedia>
                    <CardContent>
                        <Typography color="textSecondary">
                            {props.track.name}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {props.track.artists.reduce((acc, value)=>`${value.name}, ${acc}`, '')}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <IconButton size="small" onClick={props.onPlay}>
                        <PlayArrow/>
                    </IconButton>
                    <IconButton size="small" onClick={props.onDelete} color="secondary">
                        <Delete/>
                    </IconButton>
                </CardActions>
            </Card>
        </>
    )
}
