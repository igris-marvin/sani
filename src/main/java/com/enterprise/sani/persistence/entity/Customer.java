package com.enterprise.sani.persistence.entity;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;

    @Column(unique = true)
    private String username;
    private String password;
    private String email;
    private String contact;
    private String name;
    private String surname;

    @Enumerated(value = EnumType.STRING)
    private CustomerGender gender;

    @Temporal(value = TemporalType.DATE)
    private Date dateOfBirth;
    
    @Column(columnDefinition = "LONGBLOB")
    private byte[] photo;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "CUSTOMER_ADDRESS")
    private Address address;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "CUSTOMER_CART")
    private Cart cart;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "CUSTOMER_WISHLIST")
    private Wishlist wishlist;

    @Temporal(value = TemporalType.TIMESTAMP)
    private Date dateJoined;

    public Customer(
        String username, 
        String password, 
        String email, 
        String contact, 
        String name, 
        String surname,
        CustomerGender gender, 
            Date dateOfBirth, 
            byte[] photo, 
            Address address, 
            Cart cart, 
            Wishlist wishlist,
            Date dateJoined
    ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.contact = contact;
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.photo = photo;
        this.address = address;
        this.cart = cart;
        this.wishlist = wishlist;
        this.dateJoined = dateJoined;
    }

    public enum CustomerGender {
        MALE('M'),
        FEMALE('F');

        public final char custGender;

        CustomerGender(char custGender) {
            this.custGender = custGender;
        }
    }
}
