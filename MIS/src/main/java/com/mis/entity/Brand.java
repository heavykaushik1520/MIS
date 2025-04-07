package com.mis.entity;

import java.time.Instant;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "brands")
public class Brand {

	@Id
	@GeneratedValue(strategy= GenerationType.AUTO)
	private int brandId;
	
	@Column(nullable = false, length = 50)
	private String brandName;
	
	@ManyToOne
	@JoinColumn(name="chain_id" , nullable = false)
	@JsonIgnore
	private Chain chain;
	
	@OneToMany(mappedBy = "brand")
	private List<Zone> zones;
	
	private boolean isActive = true;
	
	@CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

}
