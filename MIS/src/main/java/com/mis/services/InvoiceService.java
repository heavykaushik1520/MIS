package com.mis.services;

import java.io.ByteArrayInputStream;
import java.util.List;

import com.mis.dto.InvoiceRequestDto;
import com.mis.dto.InvoiceResponseDto;

public interface InvoiceService {
	InvoiceResponseDto createInvoice(InvoiceRequestDto dto);
    InvoiceResponseDto getInvoiceById(int id);
    List<InvoiceResponseDto> getAllInvoices();
    void deleteInvoice(int id);
    InvoiceResponseDto updateInvoice(int id, InvoiceRequestDto dto);
	ByteArrayInputStream generatePdfForInvoice(int invoiceId);
}
