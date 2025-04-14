import { useEffect, useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import About from "./pages/About/About";
import Register from "./pages/Register/Register";
import { onAuthStateChanged } from "firebase/auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreatePost from "./pages/CreatePost/CreatePost";
import useAuthentication from "./hooks/useAuthentication";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Search from "./pages/Search/Search";
import Post from "./pages/Post/Post";
import EditPost from "./pages/EditPost/EditPost";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />;
  }

  return (
    <AuthProvider value={{ user }}>
      <BrowserRouter>
        <Header />
        <Main>
          <Routes>
            <Route path="/miniblog" element={<Home />} />
            <Route path="/miniblog/about" element={<About />} />
            <Route path="/miniblog/search" element={<Search />} />
            <Route path="/miniblog/posts/:id" element={<Post />} />
            <Route path="/miniblog/login" element={!user ? <Login /> : <Navigate to="/miniblog" />} />
            <Route path="/miniblog/register" element={!user ? <Register /> : <Navigate to="/miniblog" />} />
            <Route path="/miniblog/dashboard" element={user ? <Dashboard /> : <Navigate to="/miniblog/login" />} />
            <Route path="/miniblog/posts/create" element={user ? <CreatePost /> : <Navigate to="/miniblog/login" />} />
            <Route path="/miniblog/posts/edit/:id" element={user ? <EditPost /> : <Navigate to="/miniblog/login" />} />
          </Routes>
        </Main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
