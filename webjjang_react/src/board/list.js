"use client"

import axios from "axios"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const List = () => {
  const [list, setList] = useState([]) // 게시글 데이터를 상태 생성
  const [loading, setLoading] = useState(true) // 로딩 상태 추가
  const navigate = useNavigate() // 페이지 이동을 위한 함수

  useEffect(() => {
    // 컴포넌트가 처음 화면에 보일때 실행되는 코드 블록
    setLoading(true)
    axios
      .get("http://localhost/board/list.do") // get방식으로 서버에 요청 - 리스트 데이터를 요청함
      .then((res) => {
        // res 이름으로 데이터를 받음
        setList(res.data.list) // list에 받아온 데이터를 셋팅함
        setLoading(false)
      })
      .catch((err) => {
        console.log("데이터를 불러오는데 실패하였습니다.")
        setLoading(false)
      })
  }, [])

  const submit = (no) => {
    // 게시글을 클릭 시 클릭한 게시글의 상세보기로 이동하기 위한 함수 - no를 넘겨줌
    console.log("넘겨지는 번호" + no)
    navigate("/board/view?no=" + no + "&inc=1") // 페이지 이동하면서 클릭한 게시글의 no를 같이 넘겨줌
  }

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col">
          <h2 className="text-center" style={{ color: "#444" }}>
            게시판
          </h2>
          <hr className="my-4" style={{ backgroundColor: "#444" }} />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" width="10%">
                    글번호
                  </th>
                  <th scope="col" width="50%">
                    제목
                  </th>
                  <th scope="col" width="15%">
                    작성자
                  </th>
                  <th scope="col" width="15%">
                    작성일
                  </th>
                  <th scope="col" width="10%">
                    조회수
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.length > 0 ? (
                  list.map((vo) => (
                    <tr key={vo.no} onClick={() => submit(vo.no)} style={{ cursor: "pointer" }}>
                      <td>{vo.no}</td>
                      <td>{vo.title}</td>
                      <td>{vo.writer}</td>
                      <td>{dayjs(vo.writeDate).format("YYYY-MM-DD")}</td>
                      <td>{vo.hit}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      등록된 게시글이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="row mt-4">
            <div className="col text-right">
              <button className="btn btn-dark" onClick={() => navigate("/board/write")}>
                글쓰기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default List
