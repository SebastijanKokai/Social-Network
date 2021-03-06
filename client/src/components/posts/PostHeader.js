import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { set } from 'mongoose';

const PostHeader = ({ createPost }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    createPost({ text });
    setText('');
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community!
      </p>

      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Say Something...</h3>
        </div>
        <form className='form my-1' onSubmit={handleSubmit}>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Create a post'
            value={text}
            onChange={e => setText(e.target.value)}
            required
          ></textarea>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </Fragment>
  );
};

PostHeader.propTypes = {
  createPost: PropTypes.func.isRequired
};

export default PostHeader;
