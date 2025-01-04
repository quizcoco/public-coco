package com.quizcoco.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.GuestBook;
import com.quizcoco.web.repository.GuestBookRepository;

@Service
public class GuestBookServiceImp implements GuestBookService{

    @Autowired
    private GuestBookRepository repository;

    @Override
    public List<GuestBook> getListByUserId(Long userId, Integer page, Integer size) {

        int offset=(page-1)*size;

        return repository.findByUserId(userId, offset, size);
    }

    @Override
    public void add(GuestBook guestBook) {
        repository.save(guestBook);

    }
    
}
