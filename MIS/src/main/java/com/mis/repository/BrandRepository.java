package com.mis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mis.entity.Brand;

public interface BrandRepository extends JpaRepository<Brand, Integer>{
	List<Brand> findByChainChainId(int chainId);
}
