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

        LocalDate monthStart =
                currentMonth.atDay(1);

        LocalDate monthEnd =
                currentMonth.atEndOfMonth();

        BigDecimal totalExpense =
                dashboardRepository.getTotalExpense(userId);

        BigDecimal monthlyExpense =
                dashboardRepository.getExpenseBetweenDates(
                        userId,
                        monthStart,
                        monthEnd
                );

        BigDecimal todayExpense =
                dashboardRepository.getExpenseBetweenDates(
                        userId,
                        today,
                        today
                );

        long totalTransactions =
                dashboardRepository.getTotalTransactions(userId);

        Map<String, BigDecimal> categoryWise =
                new LinkedHashMap<>();

        for (Object[] row :
                dashboardRepository.getCategoryWiseExpense(userId)) {

            String category = (String) row[0];
            BigDecimal amount = (BigDecimal) row[1];

            categoryWise.put(category, amount);
        }

        Map<String, BigDecimal> paymentMethodWise =
                new LinkedHashMap<>();

        for (Object[] row :
                dashboardRepository
                        .getPaymentMethodWiseExpense(userId)) {

            String paymentMethod = (String) row[0];
            BigDecimal amount = (BigDecimal) row[1];

            paymentMethodWise.put(paymentMethod, amount);
        }

        return new DashboardResponse(
                totalExpense,
                monthlyExpense,
                todayExpense,
                totalTransactions,
                categoryWise,
                paymentMethodWise
        );
    }
}