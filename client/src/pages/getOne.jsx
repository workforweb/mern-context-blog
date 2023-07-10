import Spinner from '../components/Spinner';
import BackBtn from '../components/BackBtn';
import { useGlobalContext } from '../context/GlobalState';

export default function GetOne() {
  const { loading } = useGlobalContext();

  const post = JSON.parse(window.localStorage.getItem('post'));

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <BackBtn />
      <div className="full-post">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    </>
  );
}
