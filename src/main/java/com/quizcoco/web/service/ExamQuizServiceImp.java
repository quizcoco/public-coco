package com.quizcoco.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.ExamQuiz;
import com.quizcoco.web.entity.ExamQuizView;
import com.quizcoco.web.repository.ExamQuizRepository;


@Service
public class ExamQuizServiceImp implements ExamQuizService{

    @Autowired
    private ExamQuizRepository repository;

    
    
    @Override
    public List<ExamQuiz> getList(Integer page) {
       return getList(page,null);
    }
    
    //==============getList 집중화=============
    
    public List<ExamQuiz> getList(Integer page, String query){

        int size=10; //~개씩
        int offset=(page-1)*size; //부터

        //1-0 :10
        //2-10
        //3-20
        //4-30
        //5-40  

        List<ExamQuiz> list = repository.findAll(query, offset, size);

        return list;
    }


//========================================================================

    @Override
    public int getCount() {

        return  getCount(null);
    }
    
    
    public int getCount(String query) {
        
        int count = repository.count(query);
    
       return count;

    }

    @Override
    public ExamQuiz getById(long id) {
        return repository.findById(id);
    }



    @Override
    public void edit(ExamQuiz examQuiz) {
        repository.update(examQuiz);
    }

    @Override
    public void delById(Long id) {
        repository.delete(id);

    }

    @Override
    public void reg(ExamQuiz examQuiz) {

        repository.save(examQuiz);
    }

    @Override
    public List<ExamQuiz> getRand() {

        List<ExamQuiz> randQ = repository.rand();
        return randQ;
    }



    
}
