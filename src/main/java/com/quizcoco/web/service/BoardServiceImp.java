package com.quizcoco.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.Board;
import com.quizcoco.web.repository.BoardRepository;

@Service
public class BoardServiceImp implements BoardService {
    
    @Autowired
    public BoardRepository repository;

    @Override
    public int add (Board board,List<String> fileNames) {

      board.setImg(fileNames.get(0));
      int affected = repository.save(board);

         return affected;
    }
    
}
