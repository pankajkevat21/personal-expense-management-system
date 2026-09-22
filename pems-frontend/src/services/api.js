const API_BASE_URL = "http://localhost:8080/api";

async function request(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,
            headers
        }
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.message || "Something went wrong"
        );
    }

    return data;
}

export const api = {
    // Authentication
    login: (email, password) =>
        request("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        }),

    // User Registration
    register: (name, email, password) =>
        request("/users", {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password
            })
        }),

    // Dashboard
    dashboard: () =>
        request("/dashboard"),

    // Expenses
    getExpenses: () =>
        request("/expenses"),

    createExpense: (expense) =>
        request("/expenses", {
            method: "POST",
            body: JSON.stringify(expense)
        }),

    updateExpense: (id, expense) =>
        request(`/expenses/${id}`, {
            method: "PUT",
            body: JSON.stringify(expense)
        }),

    deleteExpense: (id) =>
        request(`/expenses/${id}`, {
            method: "DELETE"
        }),

    // Categories
    getCategories: () =>
        request("/categories"),

    createCategory: (category) =>
        request("/categories", {
            method: "POST",
            body: JSON.stringify(category)
        }),

    updateCategory: (id, category) =>
        request(`/categories/${id}`, {
            method: "PUT",
            body: JSON.stringify(category)
        }),

    deleteCategory: (id) =>
        request(`/categories/${id}`, {
            method: "DELETE"
        })
};