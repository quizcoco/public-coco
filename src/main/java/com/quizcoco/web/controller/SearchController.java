package com.quizcoco.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("search")
public class SearchController {

    @GetMapping("")
    public String searchIndex(){

        return "search/index";
    }

    @GetMapping("result")
    public String searchResult(){

        return "search/result";
    }

    @GetMapping("record")
    public String searchRecord(){

        return "search/record";
    }
}
