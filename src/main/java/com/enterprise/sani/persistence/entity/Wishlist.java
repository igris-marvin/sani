package com.enterprise.sani.persistence.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wishlistId;

    @OneToMany(fetch = FetchType.LAZY)
    private List<Furniture> wishlistFurniture;
    private Integer numberOfItems;
    private Double totalPrice;

    public Wishlist(
        List<Furniture> wishlistFurniture, 
        Integer numberOfItems, 
        Double totalPrice
    ) {
        this.wishlistFurniture = wishlistFurniture;
        this.numberOfItems = numberOfItems;
        this.totalPrice = totalPrice;
    }
}
