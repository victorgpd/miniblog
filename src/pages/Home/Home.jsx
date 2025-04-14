import styles from "./Home.module.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import PostDetail from "../../components/PostDetail/PostDetail";

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { document: posts, loading } = useFetchDocument("posts");

  const handleChange = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) return navigate(`/miniblog/search?q=${query}`);
  };

  return (
    <div className={styles.container_home}>
      <div className={styles.header_home}>
        <h1>Veja os nossos posts mais recentes</h1>
        <form onSubmit={handleSubmit} className={styles.search_form}>
          <input type="text" name="search" placeholder="Busque por tags..." value={query} onChange={handleChange} />
          <button className={styles.button_search}>Buscar</button>
        </form>
      </div>

      <div className={styles.container_posts}>
        <h2>Posts mais recentes</h2>
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}

        {loading && (
          <div className={styles.loading}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          </div>
        )}

        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts.</p>
            <Link to={"/miniblog/posts/create"}>Criar primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
