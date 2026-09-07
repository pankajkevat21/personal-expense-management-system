package com.example.pems.controller;

import com.example.pems.entity.IncomeCategory;
import com.example.pems.service.IncomeCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/income-categories")
public class IncomeCategoryController {

    private final IncomeCategoryService incomeCategoryService;

    public IncomeCategoryController(IncomeCategoryService incomeCategoryService) {
        this.incomeCategoryService = incomeCategoryService;
    }

    // Get all income categories
    @GetMapping
    public List<IncomeCategory> getAllCategories() {
        return incomeCategoryService.getAllCategories();
    }

    // Get income category by ID
    @GetMapping("/{id}")
    public ResponseEntity<IncomeCategory> getCategoryById(@PathVariable Long id) {
        return incomeCategoryService.getCategoryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create income category
    @PostMapping
    public IncomeCategory createCategory(@RequestBody IncomeCategory category) {
        return incomeCategoryService.createCategory(category);
    }

    // Update income category
    @PutMapping("/{id}")
    public ResponseEntity<IncomeCategory> updateCategory(
            @PathVariable Long id,
            @RequestBody IncomeCategory category) {

        return incomeCategoryService.updateCategory(id, category)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete income category
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {

        if (incomeCategoryService.deleteCategory(id)) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}