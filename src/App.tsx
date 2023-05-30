import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';
import routes from 'routes';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <div>
        <Routes>
          {routes.map(({ path, element }) => {
            return <Route key={path} path={path} element={element} />;
          })}
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
