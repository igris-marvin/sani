package com.enterprise.sani.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.enterprise.sani.api.dto.CategoryDTO;
import com.enterprise.sani.api.dto.SocialContactDTO;
import com.enterprise.sani.api.service.SessionService;
import com.enterprise.sani.api.service.ShopService;

@Controller
@RequestMapping("/shop")
@SessionAttributes("socials")
public class ShopController {

    @Autowired
    private SessionService sesServ;

    @Autowired
    private ShopService shopServ;

    @ModelAttribute("socials")
    public List<SocialContactDTO> sGetSocialContacts(
    ) {
        List<SocialContactDTO> socials = sesServ.getSocials();

        return socials;
    }
    
    @GetMapping
    public String getShop(
        Model model
    ) {
        List<CategoryDTO> categs = shopServ.getCategories();

        model.addAttribute("categs", categs);

        return "shop";
    }
}
