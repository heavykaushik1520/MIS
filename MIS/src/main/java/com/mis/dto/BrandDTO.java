package com.mis.dto;

import com.mis.entity.Brand;
import com.mis.entity.Chain;
import lombok.Data;

@Data
public class BrandDTO {
    private int brandId;
    private String brandName;
    private boolean active;
    private String createdAt;
    private String updatedAt;
    
    private ChainDTO chain;  // Nested DTO for chain details

    public BrandDTO(Brand brand) {
        this.brandId = brand.getBrandId();
        this.brandName = brand.getBrandName();
        this.active = brand.isActive();
        this.createdAt = brand.getCreatedAt().toString();
        this.updatedAt = brand.getUpdatedAt().toString();
        
        if (brand.getChain() != null) {
            this.chain = new ChainDTO(brand.getChain());
        }
    }
}
