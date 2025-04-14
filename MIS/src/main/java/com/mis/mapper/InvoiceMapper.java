package com.mis.mapper;

import com.mis.dto.InvoiceResponseDto;
import com.mis.entity.Invoice;
import org.springframework.stereotype.Component;

@Component
public class InvoiceMapper {

    public InvoiceResponseDto toDto(Invoice invoice) {
        InvoiceResponseDto dto = new InvoiceResponseDto();
        dto.setId(invoice.getId());
        dto.setInvoiceNo(invoice.getInvoiceNo());

        if (invoice.getEstimate() != null) {
            dto.setEstimatedId(invoice.getEstimate().getEstimatedId());
        } else {
            dto.setEstimatedId(1); // Or maybe throw error or log
        }

        dto.setChainId(invoice.getChainId());
        dto.setServiceDetails(invoice.getServiceDetails());
        dto.setQty(invoice.getQty());
        dto.setCostPerQty(invoice.getCostPerQty());
        dto.setAmountPayable(invoice.getAmountPayable());
        dto.setBalance(invoice.getBalance());
        dto.setDateOfPayment(invoice.getDateOfPayment());
        dto.setDateOfService(invoice.getDateOfService());
        dto.setDeliveryDetails(invoice.getDeliveryDetails());
        dto.setEmailId(invoice.getEmailId());

        return dto;
    }
}
