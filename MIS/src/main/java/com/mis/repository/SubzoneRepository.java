package com.mis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mis.entity.Subzone;

@Repository
public interface SubzoneRepository extends JpaRepository<Subzone, Integer> {

}
