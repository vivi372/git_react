package com.webjjang.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.webjjang.board.vo.BoardReplyVO;
import com.webjjang.util.page.PageObject;

@Mapper
public interface BoardReplyMapper {

	// 전체 데이터 개수
	public Long getTotalRow(Long no);
	
	// 리스트
	// Mybatis의 처리하는 메서드의 파라메터의 기본은 1개이다. - 2개 이상이면 @Param 어노테이션 사용. 또는 Map 을 사용
	public List<BoardReplyVO> list(@Param("pageObject") PageObject pageObject, @Param("no") Long no);
	
	// 등록
	public Integer write(BoardReplyVO vo);
	
	// 수정
	public Integer update(BoardReplyVO vo);
	
	// 삭제
	public Integer delete(BoardReplyVO vo);
	
}
