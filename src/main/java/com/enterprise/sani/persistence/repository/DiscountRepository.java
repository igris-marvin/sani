package com.enterprise.sani.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.enterprise.sani.persistence.entity.Discount;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Long> {
    
}
