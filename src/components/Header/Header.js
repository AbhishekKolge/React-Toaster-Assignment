import { NavLink, Link } from 'react-router-dom';

import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to='/' className={styles['logo__container']}>
        <span className={styles.logo}>Header</span>
      </Link>

      <nav className={styles.nav}>
        <ul className={styles['nav__list']}>
          <li className={styles['nav__item']}>
            <NavLink
              className={({ isActive }) => {
                return `${isActive ? styles.active : ''} ${styles.link}`;
              }}
              to='/component-1'
            >
              First Component
            </NavLink>
          </li>
          <li className={styles['nav__item']}>
            <NavLink
              className={({ isActive }) => {
                return `${isActive ? styles.active : ''} ${styles.link}`;
              }}
              to='/component-2'
            >
              Second Component
            </NavLink>
          </li>
          <li className={styles['nav__item']}>
            <NavLink
              className={({ isActive }) => {
                return `${isActive ? styles.active : ''} ${styles.link}`;
              }}
              to='/component-3'
            >
              Third Component
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
