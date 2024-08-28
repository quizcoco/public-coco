package com.quizcoco.web.service;

import java.util.List;

import com.quizcoco.web.entity.Board;
import com.quizcoco.web.entity.BoardImage;

public interface BoardService {

    List<Board> getList();
    Board getById(Long id);
    // List<BoardImage> getImgById(Long id); 지워도돨듯
    
    int add (Board board, List<String> fileNames);
    void addImg (Long id, List<String> fileNames);


    Board addViewCount(Board board);

    void edit(Board board,List<String> fileNames);

    void delById(Long id);
    void delImgById(Long id,List<String> fileNames);
}

