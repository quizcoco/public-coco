package com.quizcoco.web.repository;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.Board;

@Mapper
public interface BoardRepository {
    Board findById(Long id);

    int save (Board board);
    int update (Board board);
    int delete (Long id);
}
