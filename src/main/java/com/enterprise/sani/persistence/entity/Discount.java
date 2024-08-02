package com.enterprise.sani.persistence.entity;

import java.util.Date;

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
public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long discountId;
    private int discountPercentage;
    private String discountTitle;

    @Temporal(value = TemporalType.DATE)
    private Date startDate;

    @Temporal(value = TemporalType.DATE)
    private Date endDate;

    @Temporal(value = TemporalType.TIMESTAMP)
    private Date timestamp;

    public Discount(
        int discountPercentage, 
        String discountTitle, 
        Date startDate, 
        Date endDate, 
        Date timestamp
    ) {
        this.discountPercentage = discountPercentage;
        this.discountTitle = discountTitle;
        this.startDate = startDate;
        this.endDate = endDate;
        this.timestamp = timestamp;
    }
}
