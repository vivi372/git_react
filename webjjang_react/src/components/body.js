import { BrowserRouter, Route, Routes } from "react-router-dom"
import List from "../board/list"
import Update from "../board/update"
import View from "../board/view"
import Write from "../board/write"
import Main from "../main"

function Body() {
  return (
    <main className="container py-4">
      <div className="row">
        <div className="col-12">
          {/* 여기에 내용이 들어갑니다 */}
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
                        <Update/>
                    }>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
      </div>
    </main>
  )
}

export default Body
