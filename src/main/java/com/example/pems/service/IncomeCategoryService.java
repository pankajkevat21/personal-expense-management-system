package com.example.pems.service;

import com.example.pems.entity.IncomeCategory;
import com.example.pems.repository.IncomeCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IncomeCategoryService {

    private final IncomeCategoryRepository incomeCategoryRepository;

    public IncomeCategoryService(IncomeCategoryRepository incomeCategoryRepository) {
        this.incomeCategoryRepository = incomeCategoryRepository;
    }

    public List<IncomeCategory> getAllCategories() {
        return incomeCategoryRepository.findAll();
    }

    public Optional<IncomeCategory> getCategoryById(Long id) {
        return incomeCategoryRepository.findById(id);
    }

    public IncomeCategory createCategory(IncomeCategory category) {
        return incomeCategoryRepository.save(category);
    }

    public Optional<IncomeCategory> updateCategory(
            Long id,
            IncomeCategory updatedCategory) {

        return incomeCategoryRepository.findById(id)
                .map(existingCategory -> {
                    existingCategory.setName(updatedCategory.getName());
                    return incomeCategoryRepository.save(existingCategory);
                });
    }

    public boolean deleteCategory(Long id) {
        if (!incomeCategoryRepository.existsById(id)) {
            return false;
        }

        incomeCategoryRepository.deleteById(id);
        return true;
    }
}