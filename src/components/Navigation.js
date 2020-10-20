import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../routes';
import styles from '../styles.module.css';

const Navigation = () => (
  <ul className={styles.list}>
    <li>
      <NavLink
        className={styles.link}
        activeClassName={styles.activeLink}
        exact
        to={routes.homePage}
      >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink
        className={styles.link}
        activeClassName={styles.activeLink}
        to={routes.moviesPage}
      >
        Movies
      </NavLink>
    </li>
  </ul>
);

export default Navigation;
