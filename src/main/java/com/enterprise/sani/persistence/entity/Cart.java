package com.enterprise.sani.persistence.entity;

import java.util.HashMap;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapKeyClass;
import jakarta.persistence.MapKeyColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartId;

    @ElementCollection
    @MapKeyClass(Furniture.class)
    @Column(name = "CART_FURNITURE")
    @CollectionTable(
        name = "CART_FURNITURE",
        joinColumns = {
            @JoinColumn(name = "FURNITURE_ID")
        }
    )
    private HashMap<Furniture, Integer> cartFurniture = new HashMap<>();
    private Integer numberOfItems;
    private Double totalPrice;

    public Cart(
        Integer numberOfItems, 
        Double totalPrice
    ) {
        this.numberOfItems = numberOfItems;
        this.totalPrice = totalPrice;
    }
}
