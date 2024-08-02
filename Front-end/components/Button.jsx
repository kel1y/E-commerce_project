/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import loader from '../assets/loader.svg'

export const Button = ({
  text,
  backgroundColor = 'transparent',
  textColor = 'black',
  onClick,
}) => {
  return (
    <button onClick={onClick} style={{ backgroundColor, color: textColor }}>
      {text}
    </button>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string,
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  text: 'Button',
  textColor: 'black',
  onClick: undefined,
};
export const SubmitButton = ({ loading, text, spinnerHeight = '25px' }) => {
  return (
    <button
      type="submit"
      disabled={!!loading}
    >
      {loading ? (
        <img src={loader} style={{ height: `${spinnerHeight}` }}  alt='loading...'/>
      ) : (
        `${text}`
      )}
    </button>
  );
};