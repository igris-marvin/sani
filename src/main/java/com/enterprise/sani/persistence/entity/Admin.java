package com.enterprise.sani.persistence.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long adminId;

    @Column(unique = true)
    private String username;
    private String password;

    private String email;

    @Temporal(value = TemporalType.DATE)
    private Date dateAdded;

    public Admin(
        String username, 
        String password, 
        String email, 
        Date dateAdded
    ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.dateAdded = dateAdded;
    }

    
}
