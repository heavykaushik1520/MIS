package com.mis.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mis.entity.Chain;

@Repository
public interface ChainRepository extends JpaRepository<Chain, Integer> {
	Optional<Chain> findByGstnNo(String gstnNo);
}
