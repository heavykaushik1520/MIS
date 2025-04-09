package com.mis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mis.entity.Estimate;

import java.util.*;

@Repository
public interface EstimateRepository extends JpaRepository<Estimate, Integer> {
	
	List<Estimate> findByChain_ChainId(int chainId);

    List<Estimate> findByBrand_BrandId(int brandId);

    List<Estimate> findByZone_Id(int zoneId);

    List<Estimate> findByGroup_GroupId(int groupId);

}
