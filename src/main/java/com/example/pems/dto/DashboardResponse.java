package com.example.pems.dto;

import java.math.BigDecimal;
import java.util.Map;

public class DashboardResponse {

    private BigDecimal totalExpense;
    private BigDecimal monthlyExpense;
    private BigDecimal todayExpense;
    private long totalTransactions;

    private Map<String, BigDecimal> categoryWise;
    private Map<String, BigDecimal> paymentMethodWise;

    public DashboardResponse() {
    }

    public DashboardResponse(
            BigDecimal totalExpense,
            BigDecimal monthlyExpense,
            BigDecimal todayExpense,
            long totalTransactions,
            Map<String, BigDecimal> categoryWise,
            Map<String, BigDecimal> paymentMethodWise) {

        this.totalExpense = totalExpense;
        this.monthlyExpense = monthlyExpense;
        this.todayExpense = todayExpense;
        this.totalTransactions = totalTransactions;
        this.categoryWise = categoryWise;
        this.paymentMethodWise = paymentMethodWise;
    }

    public BigDecimal getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(BigDecimal totalExpense) {
        this.totalExpense = totalExpense;
    }

    public BigDecimal getMonthlyExpense() {
        return monthlyExpense;
    }

    public void setMonthlyExpense(BigDecimal monthlyExpense) {
        this.monthlyExpense = monthlyExpense;
    }

    public BigDecimal getTodayExpense() {
        return todayExpense;
    }

    public void setTodayExpense(BigDecimal todayExpense) {
        this.todayExpense = todayExpense;
    }

    public long getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(long totalTransactions) {
        this.totalTransactions = totalTransactions;
    }

    public Map<String, BigDecimal> getCategoryWise() {
        return categoryWise;
    }

    public void setCategoryWise(Map<String, BigDecimal> categoryWise) {
        this.categoryWise = categoryWise;
    }

    public Map<String, BigDecimal> getPaymentMethodWise() {
        return paymentMethodWise;
    }

    public void setPaymentMethodWise(
            Map<String, BigDecimal> paymentMethodWise) {
        this.paymentMethodWise = paymentMethodWise;
    }
}