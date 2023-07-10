import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Spinner from '../components/Spinner';
import BackBtn from '../components/BackBtn';

export default function UpdatePost() {
  const postContext = useContext(AppContext);
  const { post, updatePost, loading } = postContext;

  const navigate = useNavigate();

  useEffect(() => {
    setUpdatedPost(post);
  }, [post]);

  const [updatedPost, setUpdatedPost] = useState({
    id: '',
    title: '',
    body: '',
  });

  const { id, title, body } = updatedPost;

  const onChange = (event) =>
    setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });

  const onSubmit = (event) => {
    event.preventDefault();

    updatePost({ id, title, body });
    navigate('/');

    setUpdatedPost({ title: '', body: '' });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <BackBtn />
      <div className="container">
        <div className="form-title">Update Post</div>
        <div className="form-container">
          <form className="form" onSubmit={onSubmit}>
            <div className="row mb-1">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                aria-label="title"
                placeholder="Type title here...."
                className="input-text"
                value={title ? title : ''}
                onChange={onChange}
              />
            </div>
            <div className="row mb-1">
              <label htmlFor="body" className="form-label">
                Body
              </label>
              <textarea
                type="text"
                id="body"
                name="body"
                aria-label="body"
                placeholder="Write something...."
                className="input-text"
                value={body ? body : ''}
                onChange={onChange}
              />
            </div>
            <div className="row">
              <button type="submit" className="input-text btn-submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
