package com.enterprise.sani.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@RequestMapping("/test")
public class TestController {
    
    @GetMapping
    public String getTest(
        Model model
    ) {
        return "test";
    }
}
