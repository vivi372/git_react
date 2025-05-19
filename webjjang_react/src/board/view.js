import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const View = () => {

    const location = useLocation(); // 현재 브라우저의 주소창 정보를 가져옴.
    const param = new URLSearchParams(location.search);
    // location.search는 ?no=1 같은 문자열이고, URLSearchParams은 이 문자열을 분석해서 no=1처럼 key-value로 바꿔주는 도구
    const no = param.get("no"); // 앞에서 만든 param에서 no라는 키 값을 꺼냄

    console.log("넘어온 번호 = " + no);

    const [list, setList] = useState([]); // 게시글 데이터를 상태 생성
    const navigate = useNavigate(); // 페이지 이동

    useEffect(() => {
        axios.get(`http://localhost/board/view.do?no=${no}&inc=1`)// get 방식으로 서버에 요청
        // 게시글 상세보기에 대한 데이터 정보를 요청함
        .then((res) => { // res 이름으로 데이터를 받음
            setList(res.data); // 응답 데이터를 list 상태에 저장
        })
        .catch((err) => {
            console.log("데이터를 불러오는 과정에서 에러가 발생.");
        })
    }, [no]);

    return(
        <div>
            {/* list && - 만약 list 값이 존재한다면 <table></table>을 화면에 보여줘 */}
            {list && (
                <table>
                    <tr>
                        <th>글번호</th>
                        <td>{list.no}</td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>{list.title}</td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td>{list.content}</td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td>{list.writer}</td>
                    </tr>
                    <tr>
                        <th>작성일</th>
                        <td>{dayjs (list.writeDate).format("YYYY-MM-DD")}</td>
                    </tr>
                    <tr>
                        <th>조회수</th>
                        <td>{list.hit}</td>
                    </tr>
                </table>
            )}
            <button onClick={()=> navigate(`/board/update?no=${no}`)}>수정</button>
            <button>삭제</button>
        </div>
    );

}
export default View;