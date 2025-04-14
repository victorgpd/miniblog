import styles from "./Header.module.css";

import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";

const Header = () => {
  const { user } = useAuth();
  const { logout } = useAuthentication();

  return (
    <header className={styles.header}>
      <NavLink to={"/miniblog/"}>
        <span>
          Mini <span>Blog</span>
        </span>
      </NavLink>

      <nav className={styles.nav_bar}>
        <ul>
          <li>
            <NavLink to="/miniblog/">Home</NavLink>
          </li>
          {!user && (
            <>
              <li>
                <NavLink to="/miniblog/login">Entrar</NavLink>
              </li>
              <li>
                <NavLink to="/miniblog/register">Cadastrar</NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <NavLink to="/miniblog/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/miniblog/posts/create">Novo Post</NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/miniblog/about">Sobre</NavLink>
          </li>
          {user && (
            <li>
              <button onClick={logout}>Sair</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
