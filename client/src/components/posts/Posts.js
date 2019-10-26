import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPosts, createPost } from '../../actions/post';
import PostHeader from './PostHeader';
import PostItem from './PostItem';
import Spinner from '../layout/Spinner';
import { create } from 'domain';

const Posts = ({ getAllPosts, createPost, post: { posts, loading } }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const allPosts = posts.map(post => <PostItem key={post._id} post={post} />);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <PostHeader createPost={createPost} />
      {allPosts}
    </Fragment>
  );
};

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getAllPosts, createPost }
)(Posts);
