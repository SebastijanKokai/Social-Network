import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile: { bio, skills } }) => {
  const skillSet = skills.map(skill => (
    <div className='p-1'>
      <i className='fa fa-check'></i> {skill}
    </div>
  ));

  return (
    <div className='profile-about bg-light p-2'>
      <h2 className='text-primary'>Biography</h2>
      <p>{bio && <Fragment>{bio}</Fragment>}</p>
      <div className='line'></div>
      <h2 className='text-primary'>Skill Set</h2>
      <div className='skills'>{skillSet}</div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
