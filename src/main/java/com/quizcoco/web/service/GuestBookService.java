package com.quizcoco.web.service;

import java.util.List;

import com.quizcoco.web.entity.GuestBook;

public interface GuestBookService {

    List<GuestBook> getListByUserId(Long userId, Integer page, Integer size);

    void add(GuestBook guestBook);

    
}
