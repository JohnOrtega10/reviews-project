import React, { useEffect, useState, useContext } from 'react';
import { NavBar } from '../components/NavBar';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import BookDetail from '../pages/BookDetail';
import Account from '../pages/Account';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Loading from '../components/Loading';
import Books from '../pages/Books';
import { LoadingContext } from '../LoadingProvider';
import ProtectedRoutes from './ProtectedRoutes';
import Footer from './Footer';

function Navigation() {
  const { isLoading } = useContext(LoadingContext);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogged(token !== null);
  }, []);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogged(false);
  };

  return (
    <HashRouter>
      <NavBar isLogged={isLogged} handleLogout={handleLogout} />
      {isLoading && <Loading />}
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/account" element={<Account />} />
        </Route>
        <Route path="/*" element={<Navigate to={'/books'} replace />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default Navigation;
