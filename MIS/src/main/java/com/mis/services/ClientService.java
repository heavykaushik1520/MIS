package com.mis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.mis.entity.Client;
import com.mis.repository.ClientRepository;
import com.mis.responsewrapper.ResponseWrapper;

@Service
public class ClientService {

	@Autowired
	private ClientRepository clientRepository;

	@Autowired
	private ResponseWrapper responseWrapper;

	public ResponseEntity<?> getAllClient() {
		List<Client> allClient = clientRepository.findAll();

		if (allClient.isEmpty()) {
			responseWrapper.setMessage("No Clients found");
			responseWrapper.setData(null);
		}

		responseWrapper.setMessage("All Clients found");
		responseWrapper.setData(allClient);

		return new ResponseEntity<>(responseWrapper, HttpStatus.OK);

	}

	public ResponseEntity<?> createClient(Client client) {
		Client createdClient = clientRepository.save(client);
		responseWrapper.setMessage("Client created");
		responseWrapper.setData(createdClient);
		return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
	}

	public ResponseEntity<?> getClientById(int id) {
		Client foundClient = clientRepository.findById(id).orElseThrow(() -> {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No client found with id " + id);
		});

		responseWrapper.setMessage("Client found with id " + id);
		responseWrapper.setData(foundClient);
		return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
	}

	public ResponseEntity<?> updateClientById(int id, Client updatedClient) {
		Client foundClient = clientRepository.findById(id).orElseThrow(() -> {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No client found with id " + id);
		});

		foundClient.setName(updatedClient.getName());
		foundClient.setOrganization(updatedClient.getOrganization());

		Client client = clientRepository.save(foundClient);

		responseWrapper.setMessage("Client updated successfully");
		responseWrapper.setData(client);
		return new ResponseEntity<>(responseWrapper, HttpStatus.OK);

	}

	// delete method and other method

}
