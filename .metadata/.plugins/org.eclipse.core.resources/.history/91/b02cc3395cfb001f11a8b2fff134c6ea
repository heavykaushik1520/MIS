package com.mis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.mis.entity.Group;
import com.mis.repository.GroupRepository;
import com.mis.responsewrapper.ResponseWrapper;

@Service
public class GroupService {

	@Autowired
	private GroupRepository groupRepository;

	@Autowired
	private ResponseWrapper responseWrapper;

	public ResponseEntity<?> getAllGroups() {
		List<Group> groups = groupRepository.findAll();

		if (groups.isEmpty()) {
			responseWrapper.setMessage("All Groups ");
			responseWrapper.setData(null);
		}

		responseWrapper.setMessage("All Groups ");
		responseWrapper.setData(groups);

		return new ResponseEntity<>(responseWrapper, HttpStatus.OK);

	}
	
	public ResponseEntity<?> createGroup(Group group){
		Group createdGroup = groupRepository.save(group);
		responseWrapper.setMessage("Group Created");
		responseWrapper.setData(createdGroup);
		return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
	}
	
	public ResponseEntity<?> getGroupById(int id){
		Group foundGroup = groupRepository.findById(id).orElseThrow(()->{
			throw new ResponseStatusException(HttpStatus.NOT_FOUND , "No group found with id "+id);
		});
		
		responseWrapper.setMessage("Group Found ");
		responseWrapper.setData(foundGroup);
		return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
	}
	
	public ResponseEntity<?> updateGroupById(int id , Group updatedGroup){
		Group foundGroup = groupRepository.findById(id).orElseThrow(()->{
			throw new ResponseStatusException(HttpStatus.NOT_FOUND , "No group found with id "+id);
		});
		foundGroup.setName(updatedGroup.getName());
		Group group = groupRepository.save(foundGroup);
		
		responseWrapper.setMessage("Group Updated ");
		responseWrapper.setData(group);
		return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
		
	}
	
	//delete group method and other methods

}
