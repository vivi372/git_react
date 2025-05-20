import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './main';
import List from './board/list';
import View from './board/view';
import Write from './board/write';
import Update from './board/update';
import Header from './components/header';
import Footer from './components/footer';
import Body from './components/body';

function App() {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
 
  );
}

export default App;
