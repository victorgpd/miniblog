import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const { insertDocument, response } = useInsertDocument("posts");
  const { user } = useAuth();

  const [formError, setFormError] = useState("");
  const [newPost, setNewPost] = useState({
    titulo: "",
    imagem: "",
    conteudo: "",
    tags: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const checkImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;

      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    // checar campos vazios
    if (!newPost.titulo || !newPost.imagem || !newPost.conteudo || !newPost.tags) {
      setFormError("Por favor, preencha todos os campos.");
      return;
    }

    // verificar se URL parece válida (só por segurança inicial)
    const imageRegex = /\.(jpeg|jpg|gif|png|webp)$/i;
    const isProbablyImage = newPost.imagem.startsWith("http") && imageRegex.test(newPost.imagem);
    if (!isProbablyImage) {
      setFormError("Por favor, insira uma URL de imagem válida.");
      return;
    }

    // verificar se imagem realmente carrega
    const isImageLoadable = await checkImage(newPost.imagem);
    if (!isImageLoadable) {
      setFormError("Não foi possível carregar a imagem. Verifique a URL.");
      return;
    }

    const tagsArray = newPost.tags.split(",").map((tag) => tag.trim().toLowerCase());

    insertDocument({
      ...newPost,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });
  };

  return (
    <div className={styles.createPost}>
      <div className={styles.createPostContainer}>
        <h2 className={styles.createPostTitle}>Criar Post</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.createPostInput}>
            <label className={styles.createPostLabel} htmlFor="titulo">
              Título
            </label>
            <input type="text" name="titulo" value={newPost.titulo} onChange={handleInputChange} className={styles.createPostInputField} placeholder="Digite o título do post" />
          </div>
          <div className={styles.createPostInput}>
            <label className={styles.createPostLabel} htmlFor="imagem">
              URL da Imagem
            </label>
            <input type="text" name="imagem" value={newPost.imagem} onChange={handleInputChange} className={styles.createPostInputField} placeholder="Digite a URL da imagem" />
          </div>
          <div className={styles.createPostInput}>
            <label className={styles.createPostLabel} htmlFor="conteudo">
              Conteúdo
            </label>
            <textarea name="conteudo" value={newPost.conteudo} onChange={handleInputChange} className={styles.createPostInputField} rows="4" placeholder="Digite o conteudo do post" />
          </div>
          <div className={styles.createPostInput}>
            <label className={styles.createPostLabel} htmlFor="tags">
              Tags
            </label>
            <input type="text" name="tags" value={newPost.tags} onChange={handleInputChange} className={styles.createPostInputField} placeholder="Separe as tags com virgula" />
          </div>
          <button type="submit" className={styles.createPostButton} onClick={handleSubmit} disabled={response.loading}>
            {response.loading ? "Carregando..." : "Criar Post"}
          </button>
        </form>
      </div>
      {(response.error || formError) && <p className={styles.createPostError}>{response.error || formError}</p>}
    </div>
  );
};

export default CreatePost;
