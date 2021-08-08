import Alert from '@material-ui/lab/Alert';

export default (props: any) => {
    if (props.error) {
        return <Alert severity="error">{props.error}</Alert>
    }
    return <></>
};
