package com.enterprise.sani.persistence.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    @Enumerated(value = EnumType.STRING)
    private AddressRegion region;
    private String city;
    private String houseNumber;
    private String street;
    private String postalCode;

    @Temporal(value = TemporalType.DATE)
    private Date dateAdded;

    public Address(AddressRegion region, String city, String houseNumber, String street, String postalCode,
            Date dateAdded) {
        this.region = region;
        this.city = city;
        this.houseNumber = houseNumber;
        this.street = street;
        this.postalCode = postalCode;
        this.dateAdded = dateAdded;
    }

    public enum AddressRegion {
        EASTERN_CAPE("Eastern Cape"),
        FREE_STATE("Free State"),
        GAUTENG("Gauteng"),
        KWAZULU_NATAL("KwaZulu-Natal"),
        LIMPOPO("Limpopo"),
        MPUMALANGA("Mpumalanga"),
        NORTHERN_CAPE("Northern Cape"),
        NORTH_WEST("North West"),
        WESTERN_CAPE("Western Cape");

        public final String regionValue;

        AddressRegion(String regionValue) {
            this.regionValue = regionValue;
        }
    }
}
