import React from 'react';
import spinner_SVG from '../assets/spinner.svg';

export const SubmitButton = ({ loading, text, spinnerHeight = '25px',className='btn-submit' }) => {
  return (
    <button
      type="submit"
      className={className}
      disabled={loading ? true : false}
    >
      {loading ? (
        <img src={spinner_SVG} style={{ height: `${spinnerHeight}` }} />
      ) : (
        `${text}`
      )}
    </button>
  );
};
