package com.mis.dto;

import lombok.Data;
import java.time.Instant;
import java.util.Date;

@Data
public class EstimateDTO {
    private int chainId;
    private int groupId;
    private int brandId;
    private int zoneId;
    private String service;
    private int quantity;
    private double costPerUnit;
    private double totalCost;
    private Date deliveryDate;
    private String deliveryDetails;
}