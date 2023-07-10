import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalState';

import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { particleOptions } from '../utils/particleOptions';

export default function Login() {
  const userRef = useRef();
  const navigate = useNavigate();
  const { login } = useGlobalContext();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login({ email, password });
    navigate('/');
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
      />
      <div className="container">
        <h2 className="form-title mt-0">Login Now</h2>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="row mb-1">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                ref={userRef}
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleOnChange}
                className="input-text"
              />
            </div>
            <div className="row mb-1">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={handleOnChange}
                className="input-text"
              />
            </div>
            <button type="submit">Submit</button>
            <div className="mt-1">
              Don't have an account? <Link to={'/signup'}>Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
