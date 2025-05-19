import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './main';
import List from './board/list';
import View from './board/view';
import Write from './board/write';
import Update from './board/update';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Main />
        }>
        </Route>
        <Route path='/board/list' element={
          <List />
        }>
        </Route>
        <Route path='/board/view' element={
          <View />
        }>
        </Route>
        <Route path='/board/write' element={
          <Write />
        }>
        </Route>
        <Route path='/board/update' element={
          <Update />
        }>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
