import React from 'react';
import PropTypes from 'prop-types';

const Video = ({ videoId }) => (
  <iframe
    data-testid="video"
    width="340"
    height="315"
    src={ `https://www.youtube.com/embed/${videoId}` }
    title="YouTube video player"
    frameBorder="0"
    allow="accelerometer; autoplay;
     clipboard-write; encrypted-media;
     gyroscope; picture-in-picture"
    allowFullScreen
  />

);

Video.propTypes = {
  videoId: PropTypes.string.isRequired,
};

export default Video;
