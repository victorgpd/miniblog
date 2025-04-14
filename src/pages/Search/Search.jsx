import styles from "./Search.module.css";

import { Link } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import { useFetchDocument } from "../../hooks/useFetchDocument";

import PostDetail from "../../components/PostDetail/PostDetail";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const { document: posts, loading } = useFetchDocument("posts", search);

  return (
    <div className={styles.search_container}>
      <div className={styles.container_posts}>
        <div className={styles.header_search}>
          <button className={styles.back_button} onClick={() => window.history.back()}>
            ← Voltar
          </button>
          <h1 className={styles.title_search}>Search</h1>
        </div>
        <h2 className={styles.title_search}>Resultados para "{search}"</h2>
        {loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrado posts com essa tag</p>
            <Link to={"/miniblog/"}>Voltar</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
