package com.enterprise.sani.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.enterprise.sani.api.dto.SocialContactDTO;
import com.enterprise.sani.api.service.HomeService;
import com.enterprise.sani.api.service.SessionService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;


@Controller
@RequestMapping("/about")
@SessionAttributes("socials")
public class AboutUsController {

    @Autowired
    private SessionService sesServ;

    @ModelAttribute("socials")
    public List<SocialContactDTO> sGetSocialContacts(
    ) {
        List<SocialContactDTO> socials = sesServ.getSocials();

        return socials;
    }
    
    @GetMapping
    public String getAboutUs(
        Model model
    ) {
        return "about_us";
    }
    
}
