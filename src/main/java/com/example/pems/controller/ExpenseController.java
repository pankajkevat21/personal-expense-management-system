package com.example.pems.controller;

import com.example.pems.entity.Expense;
import com.example.pems.service.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // Get expenses with filtering, pagination and sorting
    @GetMapping
    public Page<Expense> getAllExpenses(
            Authentication authentication,

            @RequestParam(required = false)
            Long categoryId,

            @RequestParam(required = false)
            LocalDate from,

            @RequestParam(required = false)
            LocalDate to,

            Pageable pageable) {

        String email = authentication.getName();

        return expenseService.getExpenses(
                email,
                categoryId,
                from,
                to,
                pageable
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(
            @PathVariable Long id,
            Authentication authentication) {

        String email = authentication.getName();

        return expenseService.getExpenseById(id)
                .filter(expense ->
                        expense.getUser()
                                .getEmail()
                                .equals(email))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Expense createExpense(
            @Valid @RequestBody Expense expense,
            Authentication authentication) {

        return expenseService.createExpense(
                expense,
                authentication.getName()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(
            @PathVariable Long id,
            @Valid @RequestBody Expense expense,
            Authentication authentication) {

        return expenseService.updateExpense(
                        id,
                        expense,
                        authentication.getName()
                )
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(
            @PathVariable Long id,
            Authentication authentication) {

        if (expenseService.deleteExpense(
                id,
                authentication.getName())) {

            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}