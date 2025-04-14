import { Link } from "react-router-dom";
import styles from "./PostDetail.module.css";

const PostDetail = ({ post }) => {
  return (
    <div className={styles.container_post}>
      <img src={post.imagem} alt="Imagem da publicação" className={styles.image_post} />
      <h2 className={styles.title_post}>{post.titulo}</h2>
      <p className={styles.author_post}>{post.createdBy}</p>
      <div className={styles.tags_post}>
        {post.tags.map((tag) => (
          <p key={tag} className={styles.tag_post}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/miniblog/posts/${post.id}`} className={styles.button_read}>
        Ler
      </Link>
    </div>
  );
};

export default PostDetail;
