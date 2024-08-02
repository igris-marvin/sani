package com.enterprise.sani.persistence.entity;

import java.util.Date;
import java.util.List;

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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
public class Furniture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long furnitureId;
    private String furnitureName;
    private int quantity;
    private Double price;
    private String description;

    @Enumerated(value = EnumType.STRING)
    private FurnitureStatus status;

    @JoinColumn(name = "category")
    @ManyToOne(fetch = FetchType.LAZY)
    private Category category;

    @JoinColumn(name = "displayImage")
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Image displayImage;

    @Column(nullable = true)
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Image> extraImages;
    
    @JoinColumn(name = "discount")
    @ManyToOne(fetch = FetchType.LAZY)
    private Discount discount;

    @Temporal(value = TemporalType.TIMESTAMP)
    private Date dateAdded;

    public enum FurnitureStatus {
        AVAILABLE("Available"), 
        UNAVAILABLE("Unavailable"), 
        COMING_SOON("Coming Soon"), 
        OUT_OF_STOCK("Out of stock");

        private final String furnStatus;

        FurnitureStatus(String status) {
            furnStatus = status;
        }

        public String getFurnStatus() {
            return furnStatus;
        }
    }
}
