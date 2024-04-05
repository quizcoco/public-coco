package com.quizcoco.web.service;

import java.util.List;

import com.quizcoco.web.entity.Board;

public interface BoardService {
    
    int add (Board board, List<String> fileNames);
}
