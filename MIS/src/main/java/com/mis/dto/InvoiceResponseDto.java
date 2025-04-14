package com.mis.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class InvoiceResponseDto {
	 private int id;
	    private Integer invoiceNo;
	    private int estimatedId;
	    private Integer chainId;
	    private String serviceDetails;
	    private Integer qty;
	    private double costPerQty;
	    private double amountPayable;
	    private double balance;
	    private LocalDateTime dateOfPayment;
	    private Date dateOfService;
	    private String deliveryDetails;
	    private String emailId;
}
