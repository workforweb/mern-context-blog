import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackBtn from '../components/BackBtn';
import TextAreaWithWordCount from '../components/TextAreaWithWordCount';
import { useGlobalContext } from '../context/GlobalState';

export default function PostOne() {
  const { user, addPost, loading } = useGlobalContext();

  const userRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
  });

  const { title, body } = newPost;

  const onChange = (event) =>
    setNewPost({ ...newPost, [event.target.name]: event.target.value });

  const onSubmit = (event) => {
    event.preventDefault();

    addPost({ title, body, user: user.id });
    navigate('/');

    setNewPost({ title: '', body: '', user: '' });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <BackBtn />
      <div className="container">
        <div className="form-title">Submit posts</div>
        <div className="form-container">
          <form className="form" onSubmit={onSubmit}>
            <div className="row mb-1">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                ref={userRef}
                type="text"
                id="title"
                name="title"
                aria-label="title"
                placeholder="Type title here...."
                className="input-text"
                value={title}
                onChange={onChange}
              />
            </div>
            <div className="row mb-1">
              <label htmlFor="body" className="form-label">
                Body
              </label>

              <TextAreaWithWordCount
                rows={7}
                cols={3}
                htmlForId="body"
                type="text"
                name="body"
                maxLength={150}
                value={body}
                onChange={onChange}
                errorMsg="You have reached the limit!"
                ariaLabel="body"
                placeholder="Write something...."
                className="input-text"
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
