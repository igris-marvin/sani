package com.enterprise.sani.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SocialContactDTO {
    private Long id;
    private String social;
    private String url;
    private String handle;
    private String dateAdded;
}
