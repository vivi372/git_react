import axios from "axios";
import React, { useEffect, useState } from "react";

const List = () => {

    const [list, setList] = useState([]); // 게시글 데이터를 상태 생성

    useEffect(() => { // 컴포넌트가 처음 화면에 보일때 실행되는 코드 블록
        axios.get("http://localhost/board/list.do") // get방식으로 서버에 요청 - 리스트 데이터를 요청함
        .then((res) => { // res 이름으로 데이터를 받음
            setList(res.data.list); // list에 받아온 데이터를 셋팅함
        })
        .catch((err) => {
            console.log("데이터를 불러오는데 실패하였습니다.");
        })
    }, []);

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
                        <tr key={list.no}>
                            <td>{list.no}</td>
                            <td>{list.title}</td>
                            <td>{list.writer}</td>
                            <td>{list.writeDate}</td>
                            <td>{list.hit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default List;