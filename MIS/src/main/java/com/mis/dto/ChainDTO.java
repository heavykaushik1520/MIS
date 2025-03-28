package com.mis.dto;

import com.mis.entity.Chain;
import lombok.Data;

@Data
public class ChainDTO {
    private int chainId;
    private String companyName;
    private String gstnNo;
    
    public ChainDTO(Chain chain) {
        this.chainId = chain.getChainId();
        this.companyName = chain.getCompanyName();
        this.gstnNo = chain.getGstnNo();
    }
}
