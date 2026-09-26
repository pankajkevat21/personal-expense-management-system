package com.example.pems.controller;

import com.example.pems.entity.Income;
import com.example.pems.service.IncomeService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/incomes")
public class IncomeController {

    private final IncomeService incomeService;

    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    @GetMapping
    public Page<Income> getAllIncomes(
            Authentication authentication,

            @RequestParam(required = false)
            Long categoryId,

            @RequestParam(required = false)
            LocalDate from,

            @RequestParam(required = false)
            LocalDate to,

            Pageable pageable) {

        return incomeService.getIncomes(
                authentication.getName(),
                categoryId,
                from,
                to,
                pageable
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Income> getIncomeById(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        return incomeService.getIncomeById(id)
                .filter(income ->
                        income.getUser()
                                .getEmail()
                                .equals(email))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Income createIncome(
            @Valid @RequestBody Income income,
            Authentication authentication) {

        return incomeService.createIncome(
                income,
                authentication.getName()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Income> updateIncome(
            @PathVariable Long id,
            @Valid @RequestBody Income income,
            Authentication authentication) {

        return incomeService.updateIncome(
                        id,
                        income,
                        authentication.getName()
                )
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(
            @PathVariable Long id,
            Authentication authentication) {

        if (incomeService.deleteIncome(
                id,
                authentication.getName())) {

            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}