import styles from "./Post.module.css";

import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", null, id);

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  return (
    <div className={styles.post_page}>
      <div className={styles.container_post}>
        <h1 className={styles.title_post}>{post?.titulo}</h1>
        <img src={post?.imagem} alt="Imagem da publicação" className={styles.image_post} />
        <p className={styles.author_post}>Publicado por: <span>{post?.createdBy}</span></p>
        <div className={styles.tags_post}>
          {post?.tags.map((tag) => (
            <p key={tag} className={styles.tag_post}>
              <span>#</span>
              {tag}
            </p>
          ))}
        </div>
        <p className={styles.content_post}>{post?.conteudo}</p>
      </div>
    </div>
  );
};

export default Post;
