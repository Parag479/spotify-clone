import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  as: Component = 'h2' 
}) => {
  const baseClass = variant === 'primary' ? 'spotify-heading' : 
                   variant === 'secondary' ? 'spotify-subheading' : 
                   'section-title';
  
  return (
    <Component className={`${baseClass} ${className}`}>
      {children}
    </Component>
  );
};

Heading.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'section']),
  className: PropTypes.string,
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
};

export default Heading; 