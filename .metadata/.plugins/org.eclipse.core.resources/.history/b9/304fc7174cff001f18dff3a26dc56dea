package com.mis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.mis.entity.Chains;
import com.mis.repository.ChainsRepository;
import com.mis.responsewrapper.ResponseWrapper;

@Service
public class ChainsService {

	@Autowired
	private ChainsRepository chainsRepository;
	
	@Autowired
	private ResponseWrapper responseWrapper;
	
	public ResponseEntity<?> getAllChains(){
		List<Chains> chains = chainsRepository.findAll();
		if(chains.isEmpty()) {
			responseWrapper.setMessage("No chains found");
			responseWrapper.setData(null);
			return new ResponseEntity<>(responseWrapper , HttpStatus.OK);
		}
		
		responseWrapper.setMessage("Following chains found");
		responseWrapper.setData(chains);
		return new ResponseEntity<>(responseWrapper , HttpStatus.OK);
	}
	
	public ResponseEntity<?> createChains(Chains chain){
		Chains createdChain = chainsRepository.save(chain);
		responseWrapper.setMessage("Created Chain Successfully");
		responseWrapper.setData(createdChain);
		return new ResponseEntity<>(responseWrapper , HttpStatus.OK);
	}
	
	public ResponseEntity<?> getChainsById(int id){
		Chains foundChain = chainsRepository.findById(id).orElseThrow(()->{
			throw new ResponseStatusException(HttpStatus.OK , "No Chains found with id "+ id);
		});
		
		responseWrapper.setMessage("Chain found with id " + id);
		responseWrapper.setData(foundChain);
		return new ResponseEntity<>(responseWrapper , HttpStatus.OK);
	}
	
	public ResponseEntity<?> updateChainById(int id , Chains updatedChain){
		Chains foundChain = chainsRepository.findById(id).orElseThrow(()->{
			throw new ResponseStatusException(HttpStatus.OK , "No Chains found with id "+ id);
		});
		
		foundChain.setName(updatedChain.getName());
		Chains chain = chainsRepository.save(foundChain);
		
		responseWrapper.setMessage("Following chains updated Successfully");
		responseWrapper.setData(chain);
		return new ResponseEntity<>(responseWrapper , HttpStatus.OK);
	}
	
	//delete chain by id 
	
	
}
