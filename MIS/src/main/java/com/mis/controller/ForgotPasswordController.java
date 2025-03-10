package com.mis.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mis.services.ForgotPasswordService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class ForgotPasswordController {

	@Autowired
	private ForgotPasswordService forgotPasswordService;

	
	// first we have to create temporary password for the login .. once login we can change the password
	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotPassword(@RequestBody Map<String , String> request){
		String email = request.get("email");	
		String responseMessage = forgotPasswordService.sendResetPasswordEmail(email);
		return ResponseEntity.ok(Collections.singletonMap("message", responseMessage));
	}
	
	
	// here we can change the password after the login
	@PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");
        String responseMessage = forgotPasswordService.changePassword(email, newPassword);
        return ResponseEntity.ok(Collections.singletonMap("message", responseMessage));
    }
}

