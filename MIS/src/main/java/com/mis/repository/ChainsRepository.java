package com.mis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mis.entity.Chains;

@Repository
public interface ChainsRepository extends JpaRepository<Chains , Integer> {

}
