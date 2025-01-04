package com.quizcoco.web.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.quizcoco.web.entity.GuestBook;

@Mapper
public interface GuestBookRepository {

    List<GuestBook> findByUserId(Long userId, Integer offset,Integer size);

    void save(GuestBook guestBook); 

    
}
