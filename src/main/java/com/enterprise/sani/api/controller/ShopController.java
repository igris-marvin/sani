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
import com.enterprise.sani.api.dto.FurnitureDTO;
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
    
    //SHOP

    @GetMapping
    public String getShop(
        Model model
    ) {
        List<CategoryDTO> categs = shopServ.getCategories();

        model.addAttribute("categs", categs);
        model.addAttribute("black_bar_nav", 1);

        return "shop/shop";
    }

    //SHOP / CATEGORY

    @GetMapping("/category")
    public String getCategory(
        Model model
    ) {
        List<CategoryDTO> categs = shopServ.getCategories();

        model.addAttribute("categs", categs);
        model.addAttribute("black_bar_nav", 2);

        return "category";
    }

    //SHOP / BROWSE

    @GetMapping("/browse")
    public String getBrowse(
        Model model
    ) {
        List<FurnitureDTO> furniture = shopServ.getFurniture();

        model.addAttribute("furniture", furniture);
        model.addAttribute("black_bar_nav", 3);

        return "browse";
    }
}
