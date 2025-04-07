package com.mis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import com.mis.entity.Brand;
import com.mis.services.BrandService;

@RequestMapping("/api/brands")
@RestController
@CrossOrigin("*")
public class BrandController {
	
	@Autowired
	private BrandService brandService;
	
	@PostMapping("/admin/add/{chainId}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> addBrand(@PathVariable int chainId, @RequestBody Brand brand) {
        return brandService.addBrand(chainId, brand);
    }
	
	@PutMapping("/admin/update/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> updateBrand(@PathVariable int id, @RequestBody Brand brand) {
        return brandService.updateBrand(id, brand);
    }
	
	@DeleteMapping("/admin/delete/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> deleteBrand(@PathVariable int id) {
        return brandService.deleteBrand(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBrandById(@PathVariable int id) {
        return brandService.getBrandById(id);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllBrands() {
        return brandService.getAllBrands();
    }
	
	
	

}
