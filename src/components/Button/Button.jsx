import PropTypes from 'prop-types';

import style from './Button.module.css';

export const Button = ({ label, handleLoadMore })=> (
      <button
        type="button"
        className={style.ButtonLoadMore}
        onClick={handleLoadMore}
      >
        {label}
      </button>
    );

Button.propTypes = {
  label: PropTypes.string,
  handleLoadMore: PropTypes.func,
};