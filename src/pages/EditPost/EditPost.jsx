import { useEffect, useState } from "react";
import styles from "./EditPost.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useAuth } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { user } = useAuth();
  const { document: post, loading: loadingPost } = useFetchDocument("posts", null, id);
  const { updateDocument, response } = useUpdateDocument();

  const [loading, setLoading] = useState(false);
  const [logado, setLogado] = useState(false);
  const [postEditado, setPostEditado] = useState({
    titulo: "",
    imagem: "",
    conteudo: "",
    tags: "",
  });

  useEffect(() => {
    if (post) {
      if (post.uid !== user.uid) {
        setLogado(false);
        return;
      } else {
        setLogado(true);
        setPostEditado({ ...post });
      }
    }
  }, [post]);

  useEffect(() => {
    if (loadingPost) {
      setLoading(true);
    } else if (response.loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loadingPost, response]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostEditado({ ...postEditado, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDocument("posts", post.id, postEditado);
    navigate("/dashboard");
  };

  return (
    <>
      {logado && (
        <div className={styles.edit_post}>
          <div className={styles.edit_post_container}>
            <h2 className={styles.edit_post_title}>Editar Post</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.edit_post_input}>
                <label className={styles.edit_post_label} htmlFor="titulo">
                  Título
                </label>
                <input type="text" name="titulo" value={postEditado.titulo} onChange={handleInputChange} className={styles.edit_post_input_field} placeholder="Digite o título do post" />
              </div>

              <div className={styles.edit_post_input}>
                <label className={styles.edit_post_label} htmlFor="imagem">
                  URL da Imagem
                </label>
                <input type="text" name="imagem" value={postEditado.imagem} onChange={handleInputChange} className={styles.edit_post_input_field} placeholder="Digite a URL da imagem" />
              </div>

              <div className={styles.edit_post_input}>
                <label className={styles.edit_post_label} htmlFor="conteudo">
                  Conteúdo
                </label>
                <textarea name="conteudo" value={postEditado.conteudo} onChange={handleInputChange} className={styles.edit_post_input_field} rows="4" placeholder="Digite o conteúdo do post" />
              </div>

              <div className={styles.edit_post_input}>
                <label className={styles.edit_post_label} htmlFor="tags">
                  Tags
                </label>
                <input type="text" name="tags" value={postEditado.tags} onChange={handleInputChange} className={styles.edit_post_input_field} placeholder="Separe as tags com vírgula" />
              </div>

              <button type="submit" className={styles.edit_post_button} disabled={loading}>
                {loading ? "Salvando..." : "Salvar Alterações"}
              </button>
            </form>
          </div>
        </div>
      )}

      {!logado && (
        <div className={styles.edit_post}>
          <div className={styles.edit_post_container}>
            <h2 className={styles.edit_post_title}>Acesso Negado</h2>
            <p className={styles.edit_post_text}>Você não tem permissão para editar esse post.</p>
            <button className={styles.edit_post_button} onClick={() => navigate("/dashboard")}>
              Voltar para o Dashboard
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditPost;
