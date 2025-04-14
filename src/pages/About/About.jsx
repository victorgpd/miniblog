import styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.about_container}>
        <h2 className={styles.about_title}>Sobre o Projeto</h2>
        <p className={styles.about_text}>
          Este projeto foi desenvolvido com o objetivo de criar uma plataforma simples e funcional para publicação e edição de posts. Utilizando React no front-end e Firebase no back-end, a aplicação
          permite que usuários autenticados criem, editem e excluam suas próprias publicações.
        </p>
        <p className={styles.about_text}>
          O foco principal está na experiência do usuário e em funcionalidades essenciais como autenticação segura, persistência de dados e navegação fluida com React Router.
        </p>
        <p className={styles.about_text}>
          O Firebase Firestore é utilizado para armazenar os dados dos posts, enquanto os hooks personalizados como <code>useInsertDocument</code>, <code>useUpdateDocument</code> e{" "}
          <code>useDeleteDocument</code> facilitam a comunicação com o banco de dados.
        </p>
        <p className={styles.about_text}>Este sistema foi desenvolvido com fins educacionais, como parte dos meus estudos em desenvolvimento web, e também para compor meu portfólio profissional.</p>
        <p className={styles.about_text}>Sinta-se à vontade para explorar e testar o sistema! 😄</p>

        <Link to="/dashboard" className={styles.about_button}>
          Ir para o Dashboard
        </Link>
      </div>
    </div>
  );
};

export default About;
