package com.quizcoco.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.Board;
import com.quizcoco.web.entity.BoardImage;

@Mapper
public interface BoardRepository {

    List<Board> findAll();
    Board findById(Long id);

    int save (Board board);
    void update (Board board);
    int delete (Long id);

    void deleteById(Long id);


    //이미지
    List<BoardImage> findImgByBoardId(Long boardId);

    void insertImg(BoardImage boardImage);
    void deleteImgById(Long id);

}
