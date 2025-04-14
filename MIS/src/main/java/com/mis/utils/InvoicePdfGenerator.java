package com.mis.utils;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.mis.entity.Invoice;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Component
public class InvoicePdfGenerator {

    public ByteArrayInputStream generateInvoicePdf(Invoice invoice) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20);
            Paragraph title = new Paragraph("Invoice #" + invoice.getInvoiceNo(), titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph(" "));
            document.add(new Paragraph("Estimate ID: " + invoice.getEstimate().getEstimatedId()));
            document.add(new Paragraph("Chain ID: " + invoice.getChainId()));
            document.add(new Paragraph("Service: " + invoice.getServiceDetails()));
            document.add(new Paragraph("Quantity: " + invoice.getQty()));
            document.add(new Paragraph("Cost per Qty: ₹" + invoice.getCostPerQty()));
            document.add(new Paragraph("Amount Payable: ₹" + invoice.getAmountPayable()));
            document.add(new Paragraph("Balance: ₹" + invoice.getBalance()));
            document.add(new Paragraph("Date of Payment: " + invoice.getDateOfPayment()));
            document.add(new Paragraph("Date of Service: " + invoice.getDateOfService()));
            document.add(new Paragraph("Delivery Details: " + invoice.getDeliveryDetails()));
            document.add(new Paragraph("Email ID: " + invoice.getEmailId()));

            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}
