package com.quizcoco.web.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quizcoco.web.entity.Board;
import com.quizcoco.web.entity.BoardImage;
import com.quizcoco.web.repository.BoardRepository;

@Service
public class BoardServiceImp implements BoardService {
    
    @Autowired
    public BoardRepository repository;

    @Override
    public int add (Board board,List<String> fileNames) {

      int affected = repository.save(board); //useGeneratedKeys를 사용하여 자동 생성된 board_id가 board 객체에 설정됩니다.

      addImg(board.getId(), fileNames);

         return affected;
      
    }

    @Override
    public List<Board> getList() {

      List<Board> list = repository.findAll();
      return list;
    }

    @Override
    public Board getById(Long id) {
      Board board = repository.findById(id);

      board.setImg(repository.findImgByBoardId(id)); //이미지 담기

      return board;
    }

    @Override
    public void delById(Long id) {
      
      repository.deleteById(id);
    }

    @Override
    public Board addViewCount(Board board) {

      repository.update(board);
      
      return board;
    }

    @Override
    public void edit(Board board, List<String> fileNames ) {
      
      //이미지 새로 추가했을경우
      addImg(board.getId(), fileNames);
      
      //나머지 수정
      repository.update(board);

    }

    @Override
    public void delImgById(Long boardId, List<String> fileNames) {
      List<BoardImage> currentImgs=  repository.findImgByBoardId(boardId); //기존 사진

      // List<String> finalFileNames = (fileNames==null)? Collections.emptyList() : fileNames; //null일 경우 처리

      //기존 사진에서 수정 사진에 없는걸 거른 id
      List<Long> idsToDelete = currentImgs.stream() //리스트를 Stream으로 변환합니다. 반복처리를 간결하게..
                                          .filter(img -> !Optional.ofNullable(fileNames).orElse(Collections.emptyList()).contains(img.getImageUrl())) //fileNames가 null일 경우 빈 리스트 사용
                                          .map(BoardImage::getId) //map 메서드는 Stream의 각 요소를 다른 형태로 변환하는 작업을 합니다. 여기서는 BoardImage 객체를 Long 타입의 ID로 변환합니다.
                                          .collect(Collectors.toList());

      for(Long id:idsToDelete)
        repository.deleteImgById(id); //이미지 삭제
    }

    @Override
    public void addImg(Long id, List<String> fileNames) {

        for(String filename : fileNames){
          BoardImage boardImage = new BoardImage();
          boardImage.setBoardId(id);
          boardImage.setImageUrl(filename);
          repository.insertImg(boardImage);
      }
    }


    
}
