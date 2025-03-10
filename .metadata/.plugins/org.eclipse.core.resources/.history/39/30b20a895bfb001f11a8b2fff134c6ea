package com.mis.entity;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="groupp")
public class Group {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int groupId;
	
	
	private String groupName;
	private boolean isActive;
	
	private Instant createdAt;
	private Instant updatedAt;
}
