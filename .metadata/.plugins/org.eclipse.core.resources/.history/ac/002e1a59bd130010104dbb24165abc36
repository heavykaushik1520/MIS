package com.mis.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mis.entity.Zone;

@Repository
public interface ZoneRepository extends JpaRepository<Zone, Integer> {
	 List<Zone> findByIsActiveTrue();
}
