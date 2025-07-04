import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Update = () => {

    const location = useLocation(); // 현재 브라우저의 주소창 정보를 가져옴.
    const param = new URLSearchParams(location.search);
    // location.search는 ?no=1 같은 문자열이고, URLSearchParams은 이 문자열을 분석해서 no=1처럼 key-value로 바꿔주는 도구
    const no = param.get("no"); // 앞에서 만든 param에서 no라는 키 값을 꺼냄

    const [vo, setVo] = useState({
        no: "",
        title: "",
        content: "",
        writer: "",
        pw: ""
    });
    // 게시글에 대한 정보를 담을 상태를 만들고 빈 문자열로 초기화, setVO는 값을 바꿀수 있는 함수.

    useEffect(() => {
        if(!no) return; // 만약 글번호를 가져오지 못하면 더 이상 실행하지 않음.
        axios.get(`http://localhost/board/view.do?no=${no}&inc=0`) // 서버에 get 요청으로 글의 상세 정보를 가져옴.
        .then(res => {
            console.log(res.data);
            setVo(res.data); // 서버에서 받은 글 정보 상태를 vo에 저장, input 자동으로 값이 들어감.
        })
        .catch(() => alert("조회 실패")); // 글의 데이터를 가져오지 못하면 조회 실패 문구 출력
    }, [no]);

    const handleChange = (e) => { // input에 입력할때 실행되는 함수
        const {name, value} = e.target; // 입력된 name의 값과 value 값을 꺼냄
        setVo(prev => ({...prev, [name]: value}));
        // prev - 현재값, 이전 값을 바탕으로 새로운 상태의 객체를 만드는 역할
        // ...prev - 이전 상태 객체를 복사
        // [name]: value - name이라는 이름을 가진 필드만 바꾸고 나머지는 그대로 유지
    };

    return(
        <form>
            <div>
                <label>글 번호</label>
                <input type="text" className="no" value={vo.no} readOnly/>
            </div>
            <div>
                <label>제목</label>
                <input type="text" className="title" value={vo.title} onChange={handleChange}/>
            </div>
            <div>
                <label>내용</label>
                <textarea type="text" className="content" value={vo.content} onChange={handleChange}/>
            </div>
            <div>
                <label>작성자</label>
                <input type="text" className="writer" value={vo.writer} onChange={handleChange}/>
            </div>
            <div>
                <label>비밀번호</label>
                <input type="password" className="pw" onChange={handleChange} />
            </div>
        </form>
    );
}
export default Update;