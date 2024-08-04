package com.enterprise.sani.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.enterprise.sani.api.dto.SocialContactDTO;
import com.enterprise.sani.api.service.SessionService;

@Controller
@RequestMapping("/contact")
@SessionAttributes("socials")
public class ContactUsController {

    @Autowired
    private SessionService sesServ;

    @ModelAttribute("socials")
    public List<SocialContactDTO> sGetSocialContacts(
    ) {
        List<SocialContactDTO> socials = sesServ.getSocials();

        return socials;
    }
    @GetMapping
    public String getContactUs(
        Model model
    ) {
        return "contact_us";
    }
}