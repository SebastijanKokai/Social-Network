import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import PropTypes from 'prop-types';

const CommentForm = ({ postID, addComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    addComment(postID, { text });
    setText('');
  };
  return (
    <Fragment>
      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Leave a comment</h3>
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
