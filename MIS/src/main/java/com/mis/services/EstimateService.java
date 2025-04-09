package com.mis.services;



import com.mis.dto.EstimateDTO;
import com.mis.entity.*;
import com.mis.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EstimateService {

    @Autowired
    private EstimateRepository estimateRepository;

    @Autowired
    private ChainRepository chainRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    public Estimate createEstimate(EstimateDTO dto) {
        Chain chain = chainRepository.findById(dto.getChainId())
                .orElseThrow(() -> new RuntimeException("Chain not found"));

        Group group = groupRepository.findById(dto.getGroupId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        Brand brand = brandRepository.findById(dto.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        Zone zone = zoneRepository.findById(dto.getZoneId())
                .orElseThrow(() -> new RuntimeException("Zone not found"));

        Estimate estimate = new Estimate();
        estimate.setChain(chain);
        estimate.setGroup(group);
        estimate.setBrand(brand);
        estimate.setZone(zone);
        estimate.setService(dto.getService());
        estimate.setQuantity(dto.getQuantity());
        estimate.setCostPerUnit(dto.getCostPerUnit());
        estimate.setTotalCost(dto.getTotalCost());
        estimate.setDeliveryDate(dto.getDeliveryDate());
        estimate.setDeliveryDetails(dto.getDeliveryDetails());

        return estimateRepository.save(estimate);
    }

    public List<Estimate> getAllEstimates() {
        return estimateRepository.findAll();
    }

    public Estimate getEstimateById(int id) {
        return estimateRepository.findById(id).orElseThrow(() -> new RuntimeException("Estimate not found"));
    }

    public void deleteEstimate(int id) {
        estimateRepository.deleteById(id);
    }
    
    public Estimate updateEstimate(int id, EstimateDTO dto) {
        Estimate estimate = estimateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Estimate not found"));

        Chain chain = chainRepository.findById(dto.getChainId())
                .orElseThrow(() -> new RuntimeException("Chain not found"));

        Group group = groupRepository.findById(dto.getGroupId())
                .orElseThrow(() -> new RuntimeException("Group not found"));

        Brand brand = brandRepository.findById(dto.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        Zone zone = zoneRepository.findById(dto.getZoneId())
                .orElseThrow(() -> new RuntimeException("Zone not found"));

        estimate.setChain(chain);
        estimate.setGroup(group);
        estimate.setBrand(brand);
        estimate.setZone(zone);
        estimate.setService(dto.getService());
        estimate.setQuantity(dto.getQuantity());
        estimate.setCostPerUnit(dto.getCostPerUnit());
        estimate.setTotalCost(dto.getTotalCost());
        estimate.setDeliveryDate(dto.getDeliveryDate());
        estimate.setDeliveryDetails(dto.getDeliveryDetails());

        return estimateRepository.save(estimate);
    }

}
