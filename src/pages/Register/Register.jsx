/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Register.module.css";

import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import useAuthentication from "../../hooks/useAuthentication";

const Register = () => {
  // Declaração de variáveis
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [displayPassword, setDisplayPassword] = useState({
    type: "password",
    display: false,
  });

  const { createUser, error, loading } = useAuthentication();

  // Funções
  const handlePassword = () => {
    if (displayPassword.display === false) {
      setDisplayPassword({
        type: "text",
        display: true,
      });
    } else {
      setDisplayPassword({
        type: "password",
        display: false,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createUser(user);
  };

  // Renderização
  return (
    <div className={styles.register}>
      <div className={styles.register_container}>
        <h1 className={styles.register_title}>Registrar-se</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.register_input}>
            <label className={styles.register_label} htmlFor="nome">
              Nome:
            </label>
            <input type="text" id="name" name="name" value={user.name} onChange={handleChange} required className={styles.register_input_field} />
          </div>
          <div className={styles.register_input}>
            <label className={styles.register_label} htmlFor="email">
              Email:
            </label>
            <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required className={styles.register_input_field} />
          </div>
          <div className={styles.register_input}>
            <label className={styles.register_label} htmlFor="senha">
              Senha:
            </label>
            <input type={displayPassword.type} id="password" name="password" value={user.password} onChange={handleChange} minLength={6} required className={styles.register_input_field} />
            <VisibilityOutlinedIcon onClick={handlePassword} style={{ display: displayPassword.display ? "block" : "none" }} />
            <VisibilityOffOutlinedIcon onClick={handlePassword} style={{ display: displayPassword.display ? "none" : "block" }} />
          </div>
          <div className={styles.register_input}>
            <label className={styles.register_label} htmlFor="confirmPassword">
              Confirmar senha:
            </label>
            <input type={displayPassword.type} id="confirmPassword" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} required className={styles.register_input_field} />
            <VisibilityOutlinedIcon onClick={handlePassword} style={{ display: displayPassword.display ? "block" : "none" }} />
            <VisibilityOffOutlinedIcon onClick={handlePassword} style={{ display: displayPassword.display ? "none" : "block" }} />
          </div>

          <button type="submit" className={styles.register_button} disabled={loading ? "disabled" : ""}>
            {loading ? "Aguarde..." : "Registrar"}
          </button>
        </form>
      </div>
      {error && <p className={styles.register_error}>{error}</p>}
    </div>
  );
};

export default Register;
