package com.enterprise.sani.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enterprise.sani.api.dto.HomeFurnitureDTO;
import com.enterprise.sani.persistence.entity.Furniture;
import com.enterprise.sani.persistence.repository.FurnitureRepository;

@Service
public class HomeService {
    
    @Autowired
    private FurnitureRepository furnRepo;

    public List<HomeFurnitureDTO> getSpecials() {

        List<HomeFurnitureDTO> list = new ArrayList<>();

        List<Furniture> flist = furnRepo.findAll();

        

        return list;
    }
}
