package com.enterprise.sani.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.enterprise.sani.api.dto.CategoryDTO;
import com.enterprise.sani.api.dto.HomeFurnitureDTO;
import com.enterprise.sani.api.dto.SocialContactDTO;
import com.enterprise.sani.api.service.HomeService;
import com.enterprise.sani.api.service.SessionService;

@Controller
@RequestMapping("/")
@SessionAttributes("socials")
public class HomeController {

    @Autowired
    private SessionService sesServ;

    @Autowired
    private HomeService homeServ;

    @ModelAttribute("socials")
    public List<SocialContactDTO> sGetSocialContacts(
    ) {
        List<SocialContactDTO> socials = sesServ.getSocials();

        return socials;
    }
    
    @GetMapping
    public String getHome(
        Model model
    ) {
        List<HomeFurnitureDTO> specials = homeServ.getSpecials();
        List<CategoryDTO> categs = homeServ.getCategories();

        model.addAttribute("specials", specials);
        model.addAttribute("categs", categs);

        for (CategoryDTO x : categs) {
            System.out.println(x.getName());
        }

        return "index";
    }
}
