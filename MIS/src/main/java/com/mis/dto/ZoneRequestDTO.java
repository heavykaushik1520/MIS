package com.mis.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ZoneRequestDTO {

    @NotBlank(message = "Zone name cannot be empty")
    private String zoneName;

    @NotNull(message = "Brand ID cannot be null")
    private int brandId;

    private boolean isActive; 
}
