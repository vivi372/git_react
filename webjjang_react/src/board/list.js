import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const List = () => {

    const [list, setList] = useState([]); // 게시글 데이터를 상태 생성
    const navigate = useNavigate(); // 페이지 이동을 위한 함수

    useEffect(() => { // 컴포넌트가 처음 화면에 보일때 실행되는 코드 블록
        axios.get("http://localhost/board/list.do") // get방식으로 서버에 요청 - 리스트 데이터를 요청함
        .then((res) => { // res 이름으로 데이터를 받음
            setList(res.data.list); // list에 받아온 데이터를 셋팅함
        })
        .catch((err) => {
            console.log("데이터를 불러오는데 실패하였습니다.");
        })
    }, []);

    const submit = (no) => { // 게시글을 클릭 시 클릭한 게시글의 상세보기로 이동하기 위한 함수 - no를 넘겨줌
        console.log("넘겨지는 번호" + no);
        navigate("/board/view?no=" + no); // 페이지 이동하면서 클릭한 게시글의 no를 같이 넘겨줌
    }

    return(
        <div>
            <h1>Board List</h1>
            <table>
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((list) => (
                        <tr key={list.no} onClick={() => submit(list.no)}>
                            <td>{list.no}</td>
                            <td>{list.title}</td>
                            <td>{list.writer}</td>
                            <td>{dayjs (list.writeDate).format("YYYY-MM-DD")}</td>
                            <td>{list.hit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigate("/board/write")}>등록</button>
        </div>
    );
}
export default List;