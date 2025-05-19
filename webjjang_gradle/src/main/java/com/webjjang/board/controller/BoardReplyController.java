package com.webjjang.board.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webjjang.board.service.BoardReplyService;
import com.webjjang.board.vo.BoardReplyVO;
import com.webjjang.util.page.PageObject;

import jakarta.servlet.http.HttpSession;
import lombok.extern.log4j.Log4j2;

// Ajax를 통해서 데이터만 전달하는 객체 - Rest 데이터를 주고 받는 RestController
@RestController
@RequestMapping("/boardreply")
@Log4j2
public class BoardReplyController {
	
	@Autowired
	private BoardReplyService service;
	
	// 댓글 리스트
	// 받아야할 필요 데이터 - 페이지, 게시판 글번호
	// 전달 결과 데이터- 페이지네 맞는 댓글 리스트 데이터, 페이지 정보, 아이디
	@GetMapping(value = "/list.do",
			produces = MediaType.APPLICATION_JSON_VALUE
			)
	public ResponseEntity<Map<String, Object>> list(PageObject pageObject, Long no, HttpSession session){
		
		log.info("no=" + no + ", pageObject=" + pageObject);
		
		List<BoardReplyVO> list = service.list(pageObject, no);
		
		log.info(list);
		
		// 넘겨 줄 데이터를 Map을 만든다.(여러개의 데이터를 이름을 붙여서 넘겨 준다.
		Map<String, Object> map = new HashMap<>();
		map.put("list", list);
		map.put("pageObject", pageObject);
		map.put("id", "test"); // 원래는 session에서 꺼낸다. 현재 하드코드
		
		return new ResponseEntity<>(map, HttpStatus.OK);
	}
	
	// 댓글 등록 처리
	// 받아야할 필요 데이터 - 글번호, 댓글 내용, 아이디(session)
	@PostMapping(value = "/write.do",
			// 넘겨 받는 데이터의 형식 - JSON
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.TEXT_PLAIN_VALUE + ";charset=utf-8"
			)
	public ResponseEntity<String> write(@RequestBody BoardReplyVO vo, HttpSession session){
		// session에서 id 꺼내서 vo 넣기
		vo.setId("test");
		
		log.info(vo);
		
		service.write(vo);
		
		return new ResponseEntity<String>("새로운 댓글이 등록되었습니다.", HttpStatus.OK);
	}
	
	// 댓글 수정 처리
	// 받아야할 필요 데이터 - 댓글 번호, 댓글 내용, 아이디(session)
	@PostMapping(value = "/update.do",
			// 넘겨 받는 데이터의 형식 - JSON
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.TEXT_PLAIN_VALUE + ";charset=utf-8"
			)
	public ResponseEntity<String> update(@RequestBody BoardReplyVO vo, HttpSession session){
		// session에서 id 꺼내서 vo 넣기
		vo.setId("test");
		
		log.info(vo);
		
		Integer result = service.update(vo);
		
		if(result == 0) // 수정이 되지 않았을 때
			return new ResponseEntity<String>("댓글 수정이 되지 않었습니다. 정보 확인해 주세요.", HttpStatus.PRECONDITION_FAILED);
		return new ResponseEntity<String>("댓글 수정이 완료되었습니다.", HttpStatus.OK);
	}
	
	// 댓글 삭제 처리
	// 받아야할 필요 데이터 - 댓글 번호, 아이디(session)
	@GetMapping(value = "/delete.do",
			produces = MediaType.TEXT_PLAIN_VALUE + ";charset=utf-8"
			)
	public ResponseEntity<String> delete(BoardReplyVO vo, HttpSession session){
		// session에서 id 꺼내서 vo 넣기
		vo.setId("test");
		
		log.info(vo);
		
		Integer result = service.delete(vo);
		
		if(result == 0) // 삭제가 되지 않았을 때
			return new ResponseEntity<String>("댓글 삭제가 되지 않었습니다. 정보 확인해 주세요.", HttpStatus.PRECONDITION_FAILED);
		return new ResponseEntity<String>("댓글이 삭제되었습니다.", HttpStatus.OK);
	}
	
}
