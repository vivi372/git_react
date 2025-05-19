import axios from "axios";
import React, { useState } from "react";

const Write = () => {

    const [title, setTitle] =useState([]);
    const [content, setContent] =useState([]);
    const [writer, setWriter] =useState([]);
    const [pw, setPw] =useState([]);

    const handleSubmit = async () => { // 등록을 위한 함수

        // 사용자가 입력한 데이터를 하나의 객체로 묶는 코드
        const data = {
            title,
            content,
            writer,
            pw
        }

        try {
            await axios.post("http://localhost/board/write.do", data) // 입력한 데이터를 post 방식으로 서버에 보냄
            alert("게시글이 등록 되었습니다. ");
            window.location.href = "http://localhost:3000/board/list";
        } catch(err) {
            console.error(err); // 게시글 등록에 실패할때 에러 출력
        }
    }

    return(
        <div>
            <div className="form-group">
                <label>제목</label>
                <input type="text" className="title" onChange={(e) => setTitle(e.target.value)}/>
                {/* e는 이벤트 객체, e.target은 현재 입력칸을 의미, e.target.value 사용자가 입력한 실제 텍스트값
                setOOO는 OOO의 상태 값을 변경하는 React 함수 */}
            </div>
            <div className="form-group">
                <label>내용</label>
                <textarea type="text" className="content" onChange={(e) => setContent(e.target.value)} />
            </div>
            <div className="form-group">
                <label>작성자</label>
                <input type="text" className="writer" onChange={(e) => setWriter(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>비밀번호</label>
                <input type="password" className="pw" onChange={(e) => setPw(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>비밀번호 재입력</label>
                <input type="password"/>
            </div>
            <button onClick={handleSubmit}>등록</button>
        </div>
    );
}
export default Write;