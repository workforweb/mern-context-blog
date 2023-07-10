import React, { useContext, useReducer } from 'react';
import AppContext from './AppContext';
import AppReducer from './AppReducer';
import {
  REGISTER,
  LOGIN,
  LOGOUT,
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  SET_POST,
  GET_POST,
  CLEAR_POST,
  UPDATE_POST,
  CLEAR_POSTS,
  REGISTER_ERROR,
  LOGIN_ERROR,
  LOGOUT_ERROR,
  POST_ERROR,
  CLEAR_ERRORS,
} from './types';
import client from '../utils/axiosInstance';

const AppState = (props) => {
  const user =
    window?.localStorage?.getItem('user') !== 'undefined'
      ? JSON.parse(window.localStorage.getItem('user'))
      : null;

  const initialState = {
    isAuthenticated: user ? true : false,
    user: user,
    posts: [],
    post: {},
    error: null,
    loading: null,
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Function to register user.
  const register = async (user) => {
    try {
      const res = await client.post('/signup', user);

      dispatch({
        type: REGISTER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_ERROR,
        payload: err.response,
      });
    }
  };

  // Function to login user.
  const login = async (user) => {
    try {
      const res = await client.post('/login', user);
      // window.localStorage.setItem('user', JSON.stringify(res.data.user));

      dispatch({
        type: LOGIN,
        payload: res.data.user,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_ERROR,
        payload: err.response,
      });
    }
  };

  // Function to log out user.
  const logOut = async () => {
    try {
      const res = await client.get('/logout');

      dispatch({
        type: LOGOUT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOGOUT_ERROR,
        payload: err.response,
      });
    }
  };

  // Function to get all posts for the user.
  const getPosts = async () => {
    try {
      const res = await client.get('/');

      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response,
      });
    }
  };

  // Function to add a contact.
  const addPost = async (post) => {
    try {
      const res = await client.post('/', post);

      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response,
      });
    }
  };

  // Function to delete a contact.
  const deletePost = async (id) => {
    try {
      await client.delete(`/${id}`);

      dispatch({
        type: DELETE_POST,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Function to update the current contact.
  const updatePost = async (post) => {
    try {
      const res = await client.put(`/${post.id}`, post);

      dispatch({
        type: UPDATE_POST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Function to clear all contacts from the
  const clearPosts = () => {
    dispatch({ type: CLEAR_POSTS });
  };

  // Function to set the current post.
  const setPost = (post) => {
    dispatch({ type: SET_POST, payload: post });
  };
  // Function to get the current post stored in localstorage.
  const getPost = (post) => {
    dispatch({
      type: GET_POST,
      payload: window.localStorage.setItem('post', JSON.stringify(post)),
    });
  };

  // Function the clear the current post.
  const clearPost = () => {
    dispatch({ type: CLEAR_POST });
  };

  // Function to filter contacts (based on what is inputted in search field).
  // const filterContacts = (text) => {
  //   dispatch({ type: FILTER_CONTACTS, payload: text });
  // };

  // Function to clear errors for posts.
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <AppContext.Provider
      value={{
        user: state.user,
        posts: state.posts,
        post: state.post,
        error: state.error,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        register,
        login,
        logOut,
        getPosts,
        addPost,
        deletePost,
        setPost,
        getPost,
        updatePost,
        clearPosts,
        clearPost,
        clearErrors,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;

export function useGlobalContext() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider'
    );

  return context;
}
