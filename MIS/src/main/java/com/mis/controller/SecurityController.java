
package com.mis.controller;

import com.mis.repository.UserInfoRepository;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.mis.entity.Group;
import com.mis.entity.UserInfo;
import com.mis.services.GroupService;
import com.mis.services.UserInfoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class SecurityController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserInfoService userInfoService;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserInfoRepository userInfoRepository;
	
	@Autowired
	private GroupService groupService;

//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody UserInfo loginRequest) {
//        try {
//            Authentication authentication = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPasswordHash())
//            );
//            
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//            
//            return ResponseEntity.ok(Map.of("message", "Login successful", "email", loginRequest.getEmail()));
//            
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
//        }
//    }

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserInfo loginRequest) {
	    try {
	        // Find the user in the database
	        Optional<UserInfo> userOptional = userInfoRepository.findByEmail(loginRequest.getEmail());
	        if (userOptional.isEmpty()) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
	        }

	        UserInfo user = userOptional.get();

	        // Compare raw password with hashed password
	        if (!passwordEncoder.matches(loginRequest.getPasswordHash(), user.getPasswordHash())) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
	        }

	        // Authenticate the user in Spring Security
	        Authentication authentication = authenticationManager.authenticate(
	                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPasswordHash())
	        );
	        SecurityContextHolder.getContext().setAuthentication(authentication);

	        return ResponseEntity.ok(Map.of("message", "Login successful", "email", user.getEmail()));

	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
	    }
	}


	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody UserInfo userInfo) {
		return userInfoService.createUser(userInfo);
	}

	@GetMapping("/get-users")
	public ResponseEntity<?> getAllUsers() {
		return userInfoService.getAllUser();
	}
//	
//	@PostMapping("/group/create")
//	public ResponseEntity<?> createGroup(@RequestBody @Valid Group group){
//		return groupService.createGroup(group);
//	}
	
	@GetMapping("/group/all")
	public ResponseEntity<?> getAllGroups(){
		return groupService.getAllGroups();
	}
	
	@GetMapping("/group/{id}")
	public ResponseEntity<?> getGroupById(@PathVariable int id){
		return groupService.getGroupById(id);
	}
	
	@PutMapping("/group/{id}")
	public ResponseEntity<?> updateGroupById(@PathVariable int id ,@RequestBody @Valid Group updatedGroup){
		return groupService.updateGroupById(id, updatedGroup);
	}
	
	
}
