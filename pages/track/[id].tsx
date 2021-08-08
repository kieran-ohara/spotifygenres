import AppBar from '../../components/AppBar';
import TrackDetail from '../../containers/TrackDetail';
import { useRouter } from 'next/router';

export default function Component() {
  const router = useRouter()
  const { id } = router.query;

  return <>
    <AppBar/>
    <TrackDetail id={id as string}/>
    </>

}
