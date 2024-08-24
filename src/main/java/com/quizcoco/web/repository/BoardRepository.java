package com.quizcoco.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.Board;

@Mapper
public interface BoardRepository {

    List<Board> findAll();
    Board findById(Long id);

    int save (Board board);
    int update (Board board);
    int delete (Long id);
}
