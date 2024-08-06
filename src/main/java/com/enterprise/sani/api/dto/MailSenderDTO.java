package com.enterprise.sani.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MailSenderDTO {
    private String recipient;
    private String subject;
    private String body;
    private String fullName;
    private String phone;
}
