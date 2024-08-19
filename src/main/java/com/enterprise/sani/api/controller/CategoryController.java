package com.enterprise.sani.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/category")
public class CategoryController {
    
    @GetMapping("/{id}")
    public String getCategoryResult(
        @PathVariable("id") Long id
    ) {
        System.out.println("Path Variable: " + id);

        return "index";
    }
}
