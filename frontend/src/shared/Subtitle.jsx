import React from 'react';
import './subtitle.css'; // We will create this specific CSS file

const Subtitle = ({ subtitle }) => {
  return (
    <h3 className='section__subtitle'>
      {subtitle}
    </h3>
  );
};

export default Subtitle;