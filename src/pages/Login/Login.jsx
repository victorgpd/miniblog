import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, error: authError, loading } = useAuthentication();

  const navigate = useNavigate();

  useEffect(() => {
    // e;
  }, [authError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(user.email, user.password);

    if (success) {
      navigate("/miniblog/");
    }
  };

  return (
    <div className={styles.login_page}>
      <div className={styles.login_container}>
        <h1 className={styles.login_title}>Login</h1>
        <form onSubmit={handleSubmit} className={styles.login_form}>
          <div className={styles.login_input}>
            <label className={styles.login_label} htmlFor="email">
              Email
            </label>
            <input type="email" name="email" id="email" value={user.email} onChange={handleChange} required className={styles.login_input_field} />
          </div>
          <div className={styles.login_input}>
            <label className={styles.login_label} htmlFor="password">
              Senha
            </label>
            <input type="password" name="password" id="password" value={user.password} onChange={handleChange} required className={styles.login_input_field} />
          </div>
          <button type="submit" disabled={loading ? "disabled" : ""} className={styles.login_button}>
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>
      </div>
      {authError && <p className={styles.login_error}>{authError}</p>}
    </div>
  );
}
