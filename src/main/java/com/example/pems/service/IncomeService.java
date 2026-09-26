package com.example.pems.service;

import com.example.pems.entity.Income;
import com.example.pems.entity.User;
import com.example.pems.repository.IncomeRepository;
import com.example.pems.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class IncomeService {

    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;

    public IncomeService(
            IncomeRepository incomeRepository,
            UserRepository userRepository) {

        this.incomeRepository = incomeRepository;
        this.userRepository = userRepository;
    }

    public Page<Income> getIncomes(
            String email,
            Long categoryId,
            LocalDate from,
            LocalDate to,
            Pageable pageable) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Long userId = user.getId();

        if (categoryId != null && from != null && to != null) {
            return incomeRepository
                    .findByUserIdAndIncomeCategoryIdAndIncomeDateBetween(
                            userId, categoryId, from, to, pageable);
        } else if (categoryId != null) {
            return incomeRepository
                    .findByUserIdAndIncomeCategoryId(
                            userId, categoryId, pageable);
        } else if (from != null && to != null) {
            return incomeRepository
                    .findByUserIdAndIncomeDateBetween(
                            userId, from, to, pageable);
        }

        return incomeRepository.findByUserId(userId, pageable);
    }

    public Optional<Income> getIncomeById(Long id) {
        return incomeRepository.findById(id);
    }

    public Income createIncome(Income income, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        income.setUser(user);

        return incomeRepository.save(income);
    }

    public Optional<Income> updateIncome(
            Long id,
            Income updatedIncome,
            String email) {

        return incomeRepository.findById(id)
                .filter(income ->
                        income.getUser()
                                .getEmail()
                                .equals(email))
                .map(existingIncome -> {

                    existingIncome.setIncomeCategory(
                            updatedIncome.getIncomeCategory());

                    existingIncome.setAmount(
                            updatedIncome.getAmount());

                    existingIncome.setIncomeDate(
                            updatedIncome.getIncomeDate());

                    existingIncome.setIncomeTime(
                            updatedIncome.getIncomeTime());

                    existingIncome.setDescription(
                            updatedIncome.getDescription());

                    existingIncome.setPaymentMethod(
                            updatedIncome.getPaymentMethod());

                    return incomeRepository.save(existingIncome);
                });
    }

    public boolean deleteIncome(Long id, String email) {

        return incomeRepository.findById(id)
                .filter(income ->
                        income.getUser()
                                .getEmail()
                                .equals(email))
                .map(income -> {
                    incomeRepository.delete(income);
                    return true;
                })
                .orElse(false);
    }
}