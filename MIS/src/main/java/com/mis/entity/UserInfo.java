package com.mis.entity;



import com.mis.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class UserInfo {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int userId;
	
	@Column(nullable= false)
	@NotBlank(message = "name is mandatory")
	private String fullName;
	
	@Column(nullable= false , unique = true)
	@NotBlank(message = "name is mandatory")
	@Email
	private String email;
	
	@Column(nullable= false )
	@NotBlank(message = "email is mandatory")
	private String passwordHash;
	
	@Column(nullable= false )
	@NotBlank(message = "role is mandatory")
	private String role;// ADMIN , SALES_PERSON
	
	@Enumerated(EnumType.STRING)
	private Status status = Status.ACTIVE;
}
