package com.mis.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class InvoiceRequestDto {

    private int estimatedId;
    private Float balance;
    private LocalDateTime dateOfPayment;
    private String emailId;
	
}

