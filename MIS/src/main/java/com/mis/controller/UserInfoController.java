package com.mis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mis.entity.UserInfo;
import com.mis.services.UserInfoService;

@RestController
@RequestMapping("/api/users")
public class UserInfoController {

	@Autowired
	public UserInfoService userInfoService;

	@PostMapping
	public ResponseEntity<?> createUser(@RequestBody UserInfo userInfo) {
		return userInfoService.createUser(userInfo);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getUserById(@PathVariable int id) {
		return userInfoService.getUserById(id);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateUserById(@PathVariable int id, @RequestBody UserInfo updatedUser) {
		return userInfoService.updateUserById(id, updatedUser);
	}

	@GetMapping
	public ResponseEntity<?> getAllUsers() {
		return userInfoService.getAllUser();
	}

}
