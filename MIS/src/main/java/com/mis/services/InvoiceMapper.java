package com.mis.services;

import java.util.List;

import org.mapstruct.Mapper;

import com.mis.dto.InvoiceResponseDto;
import com.mis.entity.Invoice;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {

    InvoiceResponseDto toDto(Invoice invoice);

    List<InvoiceResponseDto> toDtoList(List<Invoice> invoices);
}
