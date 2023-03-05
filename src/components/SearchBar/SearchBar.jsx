import PropTypes from 'prop-types';

import style from './SearchBar.module.css';

export const Searchbar = ({ onSubmit, onChange, query }) => (
      <header className={style.searchBar}>
        <form className={style.form} onSubmit={onSubmit}>
          <button type="submit" className={style.button}>
            <span className={style.buttonLabel}>Search</span>
          </button>
          <input
            className={style.input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={onChange}
            value={query}
          />
        </form>
      </header>
)

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  query: PropTypes.string,
};