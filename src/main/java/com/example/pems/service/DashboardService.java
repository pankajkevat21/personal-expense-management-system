package com.example.pems.service;

import com.example.pems.dto.DashboardResponse;
import com.example.pems.entity.User;
import com.example.pems.repository.DashboardRepository;
import com.example.pems.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class DashboardService {

    private final DashboardRepository dashboardRepository;
    private final UserRepository userRepository;

    public DashboardService(
            DashboardRepository dashboardRepository,
            UserRepository userRepository) {

        this.dashboardRepository = dashboardRepository;
        this.userRepository = userRepository;
    }

    public DashboardResponse getDashboard(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Long userId = user.getId();

        LocalDate today = LocalDate.now();
        YearMonth currentMonth = YearMonth.now();
        LocalDate monthStart = currentMonth.atDay(1);
        LocalDate monthEnd = currentMonth.atEndOfMonth();

        // ============ EXPENSE ============
        BigDecimal totalExpense =
                dashboardRepository.getTotalExpense(userId);

        BigDecimal monthlyExpense =
                dashboardRepository.getExpenseBetweenDates(
                        userId, monthStart, monthEnd);

        BigDecimal todayExpense =
                dashboardRepository.getExpenseBetweenDates(
                        userId, today, today);

        long totalTransactions =
                dashboardRepository.getTotalTransactions(userId);

        // ============ INCOME ============
        BigDecimal totalIncome =
                dashboardRepository.getTotalIncome(userId);

        BigDecimal monthlyIncome =
                dashboardRepository.getIncomeBetweenDates(
                        userId, monthStart, monthEnd);

        // ============ SAVINGS ============
        BigDecimal netSavings =
                totalIncome.subtract(totalExpense);

        BigDecimal monthlySavings =
                monthlyIncome.subtract(monthlyExpense);

        // ============ CHARTS ============
        Map<String, BigDecimal> categoryWiseExpense =
                new LinkedHashMap<>();

        for (Object[] row :
                dashboardRepository.getCategoryWiseExpense(userId)) {
            String category = (String) row[0];
            BigDecimal amount = (BigDecimal) row[1];
            categoryWiseExpense.put(category, amount);
        }

        Map<String, BigDecimal> paymentMethodWiseExpense =
                new LinkedHashMap<>();

        for (Object[] row :
                dashboardRepository.getPaymentMethodWiseExpense(userId)) {
            String method = (String) row[0];
            BigDecimal amount = (BigDecimal) row[1];
            paymentMethodWiseExpense.put(method, amount);
        }

        Map<String, BigDecimal> categoryWiseIncome =
                new LinkedHashMap<>();

        for (Object[] row :
                dashboardRepository.getCategoryWiseIncome(userId)) {
            String category = (String) row[0];
            BigDecimal amount = (BigDecimal) row[1];
            categoryWiseIncome.put(category, amount);
        }

        return new DashboardResponse(
                totalExpense,
                monthlyExpense,
                todayExpense,
                totalTransactions,
                totalIncome,
                monthlyIncome,
                netSavings,
                monthlySavings,
                categoryWiseExpense,
                paymentMethodWiseExpense,
                categoryWiseIncome
        );
    }
}