import PropTypes from 'prop-types';

import style from './Section.module.css';

export const Section = ({children}) => (
  <section className={style.Section}>{children}</section>
)

Section.propTypes = {
  children: PropTypes.node,
};