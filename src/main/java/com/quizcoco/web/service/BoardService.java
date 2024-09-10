package com.quizcoco.web.service;

import java.util.List;

import com.quizcoco.web.entity.Board;
import com.quizcoco.web.entity.BoardImage;
import com.quizcoco.web.entity.BoardLikeView;

public interface BoardService {

    List<Board> getList(String query, Integer page, Integer size);
    Board getById(Long id);
    
    int add (Board board, List<String> fileNames);
    void addImg (Long id, List<String> fileNames);


    Board addViewCount(Board board);

    void edit(Board board,List<String> fileNames);

    void delById(Long id);
    void delImgById(Long id,List<String> fileNames);

    //카운트(리스트)
    int getCount(String query);

    List<BoardLikeView> getLikeList(Integer count);
}

