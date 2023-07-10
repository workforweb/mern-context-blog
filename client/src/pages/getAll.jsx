import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { DeleteBtn, UpdateBtn } from '../components/SvgButtonIcons';
import Spinner from '../components/Spinner';
import BackBtn from '../components/BackBtn';
import Tooltip from '../components/Tooltip/Tooltip';
import { useGlobalContext } from '../context/GlobalState';
import { capitalized } from '../utils/helpers';

export default function GetAll() {
  const navigate = useNavigate();

  const { user, posts, setPost, getPost, getPosts, deletePost, loading } =
    useGlobalContext();

  useEffect(() => {
    const allPosts = async () => {
      return await getPosts();
    };
    allPosts();
  }, []);

  // DELETE Post
  const deleteSinglePost = async (id) => {
    const confirmed = window.confirm('Are you sure to delete this post?');
    try {
      confirmed && deletePost(id);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (posts !== null && posts.length === 0 && !loading) {
    return (
      <div className="posts-add">
        <Link to={'/add'}>+</Link>
        <h4>Please add a post.</h4>
      </div>
    );
  }

  if (!posts.length) return [];

  return (
    <>
      <BackBtn />
      <div className="posts-added">
        <Link to={'/add'}>+</Link>{' '}
      </div>
      <div className="posts">
        <h2>All Posts 📫</h2>
        <div className="box">
          {posts.map((post) => {
            return (
              <div className="post-card" key={post.id}>
                <Link to={`/post/${post.slug}`} onClick={() => getPost(post)}>
                  <h2 className="post-title">{capitalized(post.title)}</h2>
                </Link>
                <p className="post-body">{capitalized(post.body)}</p>
                <div className="time-ago">
                  <div>
                    Posted by <span>{capitalized(post.user.username)}</span>
                  </div>
                  <div>{moment(post.createdAt).fromNow()}</div>
                </div>
                {post.user.id === user?.id && (
                  <div className="button">
                    <Link
                      to="/update"
                      className="btn"
                      onClick={() => setPost(post)}
                    >
                      <Tooltip content="update post" direction="right">
                        <UpdateBtn />
                      </Tooltip>
                    </Link>
                    <div
                      className="btn"
                      onClick={() => {
                        deleteSinglePost(post.id);
                      }}
                    >
                      <Tooltip content="delete post" direction="left">
                        <DeleteBtn />
                      </Tooltip>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
