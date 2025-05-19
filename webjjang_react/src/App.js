import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './main';
import List from './board/list';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
