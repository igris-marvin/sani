package com.enterprise.sani.api.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.enterprise.sani.api.dto.SocialContactDTO;
import com.enterprise.sani.persistence.entity.SocialContact;
import com.enterprise.sani.persistence.repository.SocialContactRepository;

@Service
public class SessionService {
    
    @Autowired
    private SocialContactRepository socialRepo;

    public List<SocialContactDTO> getSocials() {
        List<SocialContact> list = socialRepo.findAll();

        List<SocialContactDTO> socials = new ArrayList<>();

        for (SocialContact x : list) {

            SocialContactDTO social = convertSocial(x);

            socials.add(social);
        }

        return socials;
    }

    private SocialContactDTO convertSocial(SocialContact x) {

        SocialContactDTO obj = null;
        
        Long id = x.getSocialId();
        String social = x.getSocial().name();
        String url = x.getUrl();
        String handle = x.getHandle();
        String dateAdded = x.getDateAdded().toString();

        obj = new SocialContactDTO(id, social, url, handle, dateAdded);

        return obj;
    }


}
