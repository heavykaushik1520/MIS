package com.mis.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.mis.entity.Brand;
import com.mis.repository.BrandRepository;
import com.mis.responsewrapper.ResponseWrapper;

@Service
public class BrandService {

	@Autowired
	private BrandRepository brandRepository;

	@Autowired
	private ResponseWrapper responseWrapper;

	public ResponseEntity<?> getAllBrands() {
		List<Brand> brands = brandRepository.findAll();

		if (brands.isEmpty()) {
			responseWrapper.setMessage("No Brand found");
			responseWrapper.setData(null);
			return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
		}

		responseWrapper.setMessage("All Brand List");
		responseWrapper.setData(brands);
		return new ResponseEntity<>(responseWrapper, HttpStatus.OK);

	}

	public ResponseEntity<?> createBrand(Brand brand) {
		Brand savedBrand = brandRepository.save(brand);
		responseWrapper.setMessage("Brand created successfully");
		responseWrapper.setData(savedBrand);
		return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
	}

	public ResponseEntity<?> getBrandById(int id) {
		Brand foundBrand = brandRepository.findById(id).orElseThrow(() -> {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No brand found with id " + id);
		});
		responseWrapper.setMessage("Brand found ");
		responseWrapper.setData(foundBrand);
		return new ResponseEntity<>(responseWrapper, HttpStatus.OK);
	}

	public ResponseEntity<?> updateBrandById(int id, Brand updatedBrand) {
		Brand foundBrand = brandRepository.findById(id).orElseThrow(() -> {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No brand found with id " + id);
		});

		foundBrand.setName(updatedBrand.getName());

		Brand brand = brandRepository.save(foundBrand);

		responseWrapper.setMessage("Brand updated successfully");
		responseWrapper.setData(brand);
		return new ResponseEntity<>(responseWrapper, HttpStatus.OK);

	}
	
	//delete by id

}
