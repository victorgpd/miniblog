import styles from "./Dashboard.module.css";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { deleteDocument, loading: loadingDelete } = useDeleteDocument();
  const { document: posts, loading } = useFetchDocument("posts", null, null, user.uid);

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>

      <div className={styles.postList}>
        {(loading || loadingDelete) && (
          <div className={styles.loading}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          </div>
        )}

        {posts &&
          posts.map((post) => (
            <div key={post.id} className={styles.postItem}>
              <h2>{post.titulo}</h2>
              <p className={styles.author}>Autor: {post.createdBy}</p>
              <p className={styles.date}>Publicado em: {post.createdAt.toDate().toLocaleDateString("pt-BR")}</p>

              <div className={styles.tags}>
                {post.tags.map((tag, index) => (
                  <div key={index} className={styles.tag}>
                    <span>#</span>
                    {tag}
                  </div>
                ))}
              </div>

              <div className={styles.container_buttons}>
                <Link to={`/miniblog/posts/${post.id}`} className={styles.button}>
                  Ler
                </Link>
                <button className={styles.button} onClick={() => navigate(`/miniblog/posts/edit/${post.id}`)}>
                  Editar
                </button>
                <button className={styles.button_delete} onClick={() => deleteDocument("posts", post.id)}>
                  Excluir
                </button>
              </div>
            </div>
          ))}

        {posts && posts.length === 0 && !loading && (
          <div className={styles.noPosts}>
            <h2>Você ainda não publicou nenhum post.</h2>
            <p>Vamos começar criando o primeiro?</p>
            <Link to="/miniblog/posts/create" className={styles.createButton}>
              Criar novo post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
