package com.webjjang.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.webjjang.board.vo.BoardVO;
import com.webjjang.util.page.PageObject;

@Mapper
public interface BoardMapper {

	// 전체 데이터 가져오기
	public Long getTotalRow(PageObject pageObject);
	// 일반게시판 리스트
	public List<BoardVO> list(PageObject pageObject);
	
	// 조회수 1증가
	public Integer increase(Long no);
	// 일반 게시판 글보기
	public BoardVO view(Long no);
	
	// 일반 게시판 글등록
	public Integer write(BoardVO vo);
	
	// 일반 게시판 글수정
	public Integer update(BoardVO vo);
	
	// 일반 게시판 글삭제
	public Integer delete(BoardVO vo);
	
}
