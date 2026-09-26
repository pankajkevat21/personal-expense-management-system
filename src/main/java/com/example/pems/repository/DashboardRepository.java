package com.example.pems.repository;

import com.example.pems.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface DashboardRepository
        extends JpaRepository<Expense, Long> {

    // ============== EXPENSE QUERIES ==============

    @Query("""
            SELECT COALESCE(SUM(e.amount), 0)
            FROM Expense e
            WHERE e.user.id = :userId
            """)
    BigDecimal getTotalExpense(Long userId);

    @Query("""
            SELECT COALESCE(SUM(e.amount), 0)
            FROM Expense e
            WHERE e.user.id = :userId
            AND e.expenseDate BETWEEN :startDate AND :endDate
            """)
    BigDecimal getExpenseBetweenDates(
            Long userId,
            LocalDate startDate,
            LocalDate endDate
    );

    @Query("""
            SELECT COUNT(e)
            FROM Expense e
            WHERE e.user.id = :userId
            """)
    long getTotalTransactions(Long userId);

    @Query("""
            SELECT e.category.name, COALESCE(SUM(e.amount), 0)
            FROM Expense e
            WHERE e.user.id = :userId
            GROUP BY e.category.name
            ORDER BY SUM(e.amount) DESC
            """)
    List<Object[]> getCategoryWiseExpense(Long userId);

    @Query("""
            SELECT e.paymentMethod, COALESCE(SUM(e.amount), 0)
            FROM Expense e
            WHERE e.user.id = :userId
            GROUP BY e.paymentMethod
            ORDER BY SUM(e.amount) DESC
            """)
    List<Object[]> getPaymentMethodWiseExpense(Long userId);

    // ============== INCOME QUERIES ==============

    @Query("""
            SELECT COALESCE(SUM(i.amount), 0)
            FROM Income i
            WHERE i.user.id = :userId
            """)
    BigDecimal getTotalIncome(Long userId);

    @Query("""
            SELECT COALESCE(SUM(i.amount), 0)
            FROM Income i
            WHERE i.user.id = :userId
            AND i.incomeDate BETWEEN :startDate AND :endDate
            """)
    BigDecimal getIncomeBetweenDates(
            Long userId,
            LocalDate startDate,
            LocalDate endDate
    );

    @Query("""
            SELECT i.incomeCategory.name, COALESCE(SUM(i.amount), 0)
            FROM Income i
            WHERE i.user.id = :userId
            GROUP BY i.incomeCategory.name
            ORDER BY SUM(i.amount) DESC
            """)
    List<Object[]> getCategoryWiseIncome(Long userId);
}