package com.enterprise.sani.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.enterprise.sani.api.dto.MailSenderDTO;
import com.enterprise.sani.api.service.MailSenderService;

@Controller
@RequestMapping("/mail")
@SessionAttributes("socials")
public class MailSenderController {

    @Autowired
    private MailSenderService msServ;
    
    @PostMapping
    public String posSendEmail(
        @RequestParam("email") String email,
        @ModelAttribute("sender") MailSenderDTO sender,
        Model model
    ) {
        String result = msServ.sendEmail(sender, email);

        model.addAttribute("result", result);

        return "contact_us_result";
    }
}
