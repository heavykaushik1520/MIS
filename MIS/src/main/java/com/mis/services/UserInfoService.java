package com.mis.services;

import java.util.List;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.mis.entity.UserInfo;
import com.mis.repository.UserInfoRepository;
import com.mis.responsewrapper.ResponseWrapper;

@Service
public class UserInfoService implements UserDetailsService {

	@Autowired
	private ResponseWrapper responseWrapper;

	@Autowired
	private UserInfoRepository userInfoRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder; 
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<UserInfo> userDetail = userInfoRepository.findByEmail(username);
		return userDetail.map(UserInfoDetails::new)
				.orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
	}


	/*public ResponseEntity<?> createUser(UserInfo userInfo) {
	   
	    Optional<UserInfo> existingUser = userInfoRepository.findByEmail(userInfo.getEmail());
	    if (existingUser.isPresent()) {
	        responseWrapper.setMessage("Email already registered!");
	        responseWrapper.setData(null);
	        return new ResponseEntity<>(responseWrapper, HttpStatus.BAD_REQUEST);
	    }

	    System.out.println("Raw Password: " + userInfo.getPasswordHash()); // Print raw password
	    String encodedPassword = passwordEncoder.encode(userInfo.getPasswordHash());
	    System.out.println("Encoded Password: " + encodedPassword); // Print encoded password

	    userInfo.setPasswordHash(encodedPassword);
	    UserInfo savedUser = userInfoRepository.save(userInfo);

	 
	    responseWrapper.setMessage("User Created Successfully");
	    responseWrapper.setData(savedUser);
	    return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
	}*/
	
	public String addUser(UserInfo userInfo) {
		userInfo.setPasswordHash(passwordEncoder.encode(userInfo.getPasswordHash()));
		userInfoRepository.save(userInfo);
		return "User added successfully";
	}





	
	
	//delete method not yet developed
}
