import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const View = () => {

    const location = useLocation(); // 현재 브라우저의 주소창 정보를 가져옴.
    const param = new URLSearchParams(location.search);
    // location.search는 ?no=1 같은 문자열이고, URLSearchParams은 이 문자열을 분석해서 no=1처럼 key-value로 바꿔주는 도구
    const no = param.get("no"); // 앞에서 만든 param에서 no라는 키 값을 꺼냄
    const inc = param.get("inc");

    console.log("넘어온 번호 = " + no);

    const [list, setList] = useState([]); // 게시글 데이터를 상태 생성
    const [pw, setPw] = useState(""); // 게시글 삭제에서 비밀번호가 일치한지 확인하기 위한 상태 생성
    const navigate = useNavigate(); // 페이지 이동

    useEffect(() => {
        axios.get(`http://localhost/board/view.do?no=${no}&inc=${inc}`)// get 방식으로 서버에 요청
        // 게시글 상세보기에 대한 데이터 정보를 요청함
        .then((res) => { // res 이름으로 데이터를 받음
            setList(res.data); // 응답 데이터를 list 상태에 저장
        })
        .catch((err) => {
            console.log("데이터를 불러오는 과정에서 에러가 발생.");
        })
    }, [no]);

    const handleDelete = () => { // 삭제를 위한 함수
        if(!pw.trim()) { // 비밀번호가 입력되 않았다면 아래의 문구를 출력
            alert("비밀번호를 입력하세요")
            return;
        }

        if(!window.confirm("정말 삭제하시겠습니까?")) return;
        // confirm() - 브라우저 기본 제공 함수, 팝업창 띄우는 함수

        axios.post("http://localhost/board/delete.do", {
            no,
            pw
        })
        .then((res) => { // res로 서버에서 받은 요청을 담음
            alert(res.data); // 받은 데이터를 출력함.
            if(res.status == 200) navigate("/board/list"); // 200(성공)시 /board/list로 페이지 이동
            else navigate(`/board/view?no=${no}&inc=0`); // 실패 시 /board/view로 페이지 이동
        })
        .catch(() => {
            alert("일반게시판 글 삭제 중 서버 오류가 발생하였습니다.");
        })
    }

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
            <button onClick={handleDelete}>삭제</button>
            <button onClick={() => navigate("/board/list")}>리스트</button>
            <div>
                <input type="password" placeholder="비밀번호 입력" value={pw} onChange={(e) => setPw(e.target.value)} />
            </div>
        </div>
    );

}
export default View;