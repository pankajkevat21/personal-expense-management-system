import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function Expenses() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    category: "",
    amount: "",
    expenseDate: "",
    expenseTime: "",
    description: "",
    paymentMethod: "",
    currency: "INR"
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [expenseData, categoryData] = await Promise.all([
        api.getExpenses(),
        api.getCategories()
      ]);
      setExpenses(expenseData.content || []);
      setCategories(categoryData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setForm({
      category: "",
      amount: "",
      expenseDate: "",
      expenseTime: "",
      description: "",
      paymentMethod: "",
      currency: "INR"
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const expenseData = {
        user: { id: user.id },
        category: { id: Number(form.category) },
        amount: Number(form.amount),
        expenseDate: form.expenseDate,
        expenseTime: form.expenseTime || null,
        description: form.description,
        paymentMethod: form.paymentMethod,
        currency: form.currency
      };

      if (editingId) {
        await api.updateExpense(editingId, expenseData);
      } else {
        await api.createExpense(expenseData);
      }

      resetForm();
      await loadData();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setForm({
      category: expense.category?.id || "",
      amount: expense.amount || "",
      expenseDate: expense.expenseDate || "",
      expenseTime: expense.expenseTime || "",
      description: expense.description || "",
      paymentMethod: expense.paymentMethod || "",
      currency: expense.currency || "INR"
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (!confirmed) return;

    try {
      await api.deleteExpense(id);
      await loadData();
    } catch (error) {
      setError(error.message);
    }
  };

  // ==================== LOADING STATE (replaced) ====================
  if (loading) {
    return (
      <div className="expenses-page">
        <div className="expenses-loading">
          <h2>Loading expenses...</h2>
        </div>
      </div>
    );
  }

  // ==================== MAIN RETURN (replaced) ====================
  return (
    <div className="expenses-page">

      <header className="expenses-navbar">
        <div
          className="expenses-logo"
          onClick={() => navigate("/dashboard")}
        >
          PEMS
        </div>
        <div className="expenses-nav-right">
          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
          <button
            className="expenses-active-nav"
            onClick={() => navigate("/expenses")}
          >
            Expenses
          </button>
          <button onClick={() => navigate("/categories")}>
            Categories
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="expenses-content">
        <div className="expenses-header">
          <div>
            <h1>{editingId ? "Edit Expense" : "Add Expense"}</h1>
            <p>Manage your personal expenses</p>
          </div>
        </div>

        {error && <p className="expenses-error">{error}</p>}

        <form className="expenses-form" onSubmit={handleSubmit}>
          <div className="expense-field">
            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="expense-field">
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              min="0.01"
              step="0.01"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="expense-field">
            <label>Expense Date</label>
            <input
              type="date"
              name="expenseDate"
              value={form.expenseDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="expense-field">
            <label>Expense Time</label>
            <input
              type="time"
              name="expenseTime"
              value={form.expenseTime}
              onChange={handleChange}
            />
          </div>

          <div className="expense-field">
            <label>Payment Method</label>
            <input
              type="text"
              name="paymentMethod"
              placeholder="e.g. UPI, Cash, Card"
              value={form.paymentMethod}
              onChange={handleChange}
              required
            />
          </div>

          <div className="expense-field">
            <label>Currency</label>
            <input
              type="text"
              name="currency"
              placeholder="Currency"
              value={form.currency}
              onChange={handleChange}
              required
            />
          </div>

          <div className="expense-field expense-description">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="expense-form-actions">
            <button type="submit">
              {editingId ? "Update Expense" : "Add Expense"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <section className="expenses-section">
          <div className="expenses-section-header">
            <h2>Expenses</h2>
            <span>
              {expenses.length}{" "}
              {expenses.length === 1 ? "Transaction" : "Transactions"}
            </span>
          </div>

          {expenses.length === 0 ? (
            <p className="expenses-empty">No expenses found.</p>
          ) : (
            <div className="expenses-list">
              {expenses.map(expense => (
                <div className="expenses-item" key={expense.id}>
                  <div className="expenses-item-info">
                    <div className="expenses-amount">₹{expense.amount}</div>
                    <div className="expenses-details">
                      <strong>{expense.category?.name}</strong>
                      {expense.description && <p>{expense.description}</p>}
                      <small>
                        {expense.expenseDate} {expense.expenseTime || ""} •{" "}
                        {expense.paymentMethod}
                      </small>
                    </div>
                  </div>
                  <div className="expenses-actions">
                    <button
                      className="expenses-edit-button"
                      onClick={() => handleEdit(expense)}
                    >
                      Edit
                    </button>
                    <button
                      className="expenses-delete-button"
                      onClick={() => handleDelete(expense.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Expenses;