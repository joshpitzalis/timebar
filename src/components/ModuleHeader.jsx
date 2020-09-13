import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export const Header = ({ dispatch, type, sectionTitle }) => (
  <div className="bb b--black-05 w-100 mw9 flex justify-between mv3 items-center ">
    <h1 className="mb3 b">{sectionTitle} </h1>

    <button
      type="button"
      className="f6 link dim pointer bn ph3 pv2 mb2 dib white bg-green"
      onClick={() => dispatch({ type })}
      data-testid="createTask"
    >
      + New List
    </button>
  </div>
);

Header.propTypes = propTypes;
