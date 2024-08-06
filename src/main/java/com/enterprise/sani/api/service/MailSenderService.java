package com.enterprise.sani.api.service;

import java.time.Instant;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.enterprise.sani.api.dto.MailSenderDTO;

import jakarta.mail.internet.MimeMessage;

@Service
public class MailSenderService {
    
    @Autowired
    private JavaMailSender jms;

    public String sendEmail(
        MailSenderDTO dto,
        String email
    ) {

        try {
            MimeMessage mimeMessage = jms.createMimeMessage();
            MimeMessageHelper mmh = new MimeMessageHelper(mimeMessage, true);

            mmh.setFrom(dto.getRecipient());
            mmh.setTo(email);
            mmh.setSubject(dto.getSubject());
            mmh.setText(dto.getBody());
            mmh.setSentDate(Date.from(Instant.now()));

            jms.send(mimeMessage);

        } catch (Exception e) {
            System.err.println(e.getMessage());
            return "F";
        }

        return "T";
    }
}
