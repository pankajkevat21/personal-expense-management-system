package com.example.pems.dto;

import java.math.BigDecimal;
import java.util.Map;

public class DashboardResponse {

    // Expense
    private BigDecimal totalExpense;
    private BigDecimal monthlyExpense;
    private BigDecimal todayExpense;
    private long totalTransactions;

    // Income (new)
    private BigDecimal totalIncome;
    private BigDecimal monthlyIncome;

    // Savings (new)
    private BigDecimal netSavings;
    private BigDecimal monthlySavings;

    // Charts
    private Map<String, BigDecimal> categoryWiseExpense;
    private Map<String, BigDecimal> paymentMethodWiseExpense;
    private Map<String, BigDecimal> categoryWiseIncome;

    public DashboardResponse(
            BigDecimal totalExpense,
            BigDecimal monthlyExpense,
            BigDecimal todayExpense,
            long totalTransactions,
            BigDecimal totalIncome,
            BigDecimal monthlyIncome,
            BigDecimal netSavings,
            BigDecimal monthlySavings,
            Map<String, BigDecimal> categoryWiseExpense,
            Map<String, BigDecimal> paymentMethodWiseExpense,
            Map<String, BigDecimal> categoryWiseIncome) {

        this.totalExpense = totalExpense;
        this.monthlyExpense = monthlyExpense;
        this.todayExpense = todayExpense;
        this.totalTransactions = totalTransactions;
        this.totalIncome = totalIncome;
        this.monthlyIncome = monthlyIncome;
        this.netSavings = netSavings;
        this.monthlySavings = monthlySavings;
        this.categoryWiseExpense = categoryWiseExpense;
        this.paymentMethodWiseExpense = paymentMethodWiseExpense;
        this.categoryWiseIncome = categoryWiseIncome;
    }

    // Getters
    public BigDecimal getTotalExpense() { return totalExpense; }
    public BigDecimal getMonthlyExpense() { return monthlyExpense; }
    public BigDecimal getTodayExpense() { return todayExpense; }
    public long getTotalTransactions() { return totalTransactions; }
    public BigDecimal getTotalIncome() { return totalIncome; }
    public BigDecimal getMonthlyIncome() { return monthlyIncome; }
    public BigDecimal getNetSavings() { return netSavings; }
    public BigDecimal getMonthlySavings() { return monthlySavings; }
    public Map<String, BigDecimal> getCategoryWiseExpense() { return categoryWiseExpense; }
    public Map<String, BigDecimal> getPaymentMethodWiseExpense() { return paymentMethodWiseExpense; }
    public Map<String, BigDecimal> getCategoryWiseIncome() { return categoryWiseIncome; }
}