package com.mis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mis.entity.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Integer> {

}
