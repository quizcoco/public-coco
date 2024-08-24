package com.quizcoco.web.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.quizcoco.web.entity.Board;
import com.quizcoco.web.service.BoardService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("board")
public class BoardController {

    @Autowired
    private BoardService service;

    @GetMapping("list")
    public String list(Model model){

        List<Board> list = service.getList();


        model.addAttribute("boardList",list);
        model.addAttribute("pageTitle","자유 게시판");

        return "board/list";
        
    }

    @GetMapping("reg")
    public String reg(Model model){

        model.addAttribute("pageTitle","게시글 작성");


        return "board/reg";
        
    }

    @PostMapping("reg")
    public String reg(Board board, 
                            @RequestParam("img-file") List<MultipartFile> imgFiles
                            ,HttpServletRequest request) throws IllegalStateException, IOException {


        List<String> fileNames = new ArrayList<>();
        for (MultipartFile imgFile : imgFiles)
        {                       
            String fileName = "";

            if(imgFile != null && !imgFile.isEmpty())   
            {
                fileName = imgFile.getOriginalFilename();
                String path = "/img/board";
            
                String realPath = request.getServletContext().getRealPath(path);
                File pathFile = new File(realPath);
                if(!pathFile.exists())
                    pathFile.mkdirs();
                File file = new File(realPath+File.separator+fileName);
                
                imgFile.transferTo(file);

                fileNames.add(fileName);
            }
        }
          
        //board.setImg(fileName);
        service.add(board,fileNames);

        return "redirect:list";
    }
}

