import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function Dashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState("");

    const user =
        JSON.parse(localStorage.getItem("user")) || {};

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        loadDashboard();

    }, [navigate]);

    const loadDashboard = async () => {

        try {

            const data = await api.dashboard();

            setDashboard(data);

        } catch (error) {

            setError(error.message);

        }
    };

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    const formatAmount = (amount) => {

        return Number(amount || 0).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
    };

    if (error) {

        return (
            <div className="dashboard-page">

                <div className="error-container">

                    <h2>
                        Unable to load dashboard
                    </h2>

                    <p className="error">
                        {error}
                    </p>

                    <button onClick={handleLogout}>
                        Back to Login
                    </button>

                </div>

            </div>
        );
    }

    if (!dashboard) {

        return (
            <div className="loading-container">

                <h2>
                    Loading Dashboard...
                </h2>

            </div>
        );
    }

    const categoryData =
        Object.entries(
            dashboard.categoryWise || {}
        );

    const paymentData =
        Object.entries(
            dashboard.paymentMethodWise || {}
        );

    return (
        <div className="dashboard-page">

            {/* ================= NAVBAR ================= */}

            <header className="navbar">

                <div
                    className="logo"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    PEMS
                </div>


                <nav className="nav-menu">

                    <button
                        className="active-nav"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={() =>
                            navigate("/expenses")
                        }
                    >
                        Expenses
                    </button>

                    <button
                        onClick={() =>
                            navigate("/categories")
                        }
                    >
                        Categories
                    </button>

                </nav>


                <div className="nav-user">

                    <span>
                        {user.name}
                    </span>

                    <button
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* ================= CONTENT ================= */}

            <main className="dashboard-content">

                <div className="dashboard-header">

                    <div>

                        <h1>
                            Dashboard
                        </h1>

                        <p>
                            Welcome back, {user.name}
                        </p>

                    </div>

                    <button
                        className="primary-button"
                        onClick={() =>
                            navigate("/expenses")
                        }
                    >
                        + Add Expense
                    </button>

                </div>


                {/* SUMMARY CARDS */}

                <div className="dashboard-cards">

                    <div className="dashboard-card">

                        <div className="card-title">
                            Total Expense
                        </div>

                        <div className="card-value">
                            ₹{formatAmount(
                                dashboard.totalExpense
                            )}
                        </div>

                    </div>


                    <div className="dashboard-card">

                        <div className="card-title">
                            This Month
                        </div>

                        <div className="card-value">
                            ₹{formatAmount(
                                dashboard.monthlyExpense
                            )}
                        </div>

                    </div>


                    <div className="dashboard-card">

                        <div className="card-title">
                            Today
                        </div>

                        <div className="card-value">
                            ₹{formatAmount(
                                dashboard.todayExpense
                            )}
                        </div>

                    </div>


                    <div className="dashboard-card">

                        <div className="card-title">
                            Transactions
                        </div>

                        <div className="card-value">
                            {dashboard.totalTransactions}
                        </div>

                    </div>

                </div>


                {/* CATEGORY + PAYMENT */}

                <div className="dashboard-grid">

                    <section className="dashboard-section">

                        <div className="section-header">

                            <h2>
                                Category Wise
                            </h2>

                        </div>

                        {categoryData.length === 0 ? (

                            <p className="empty-text">
                                No category data available.
                            </p>

                        ) : (

                            <div className="data-list">

                                {categoryData.map(
                                    ([category, amount]) => (

                                        <div
                                            className="data-row"
                                            key={category}
                                        >

                                            <span>
                                                {category}
                                            </span>

                                            <strong>
                                                ₹{formatAmount(
                                                    amount
                                                )}
                                            </strong>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </section>


                    <section className="dashboard-section">

                        <div className="section-header">

                            <h2>
                                Payment Methods
                            </h2>

                        </div>

                        {paymentData.length === 0 ? (

                            <p className="empty-text">
                                No payment data available.
                            </p>

                        ) : (

                            <div className="data-list">

                                {paymentData.map(
                                    ([method, amount]) => (

                                        <div
                                            className="data-row"
                                            key={method}
                                        >

                                            <span>
                                                {method}
                                            </span>

                                            <strong>
                                                ₹{formatAmount(
                                                    amount
                                                )}
                                            </strong>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </section>

                </div>


                {/* QUICK ACTIONS */}

                <section className="dashboard-section quick-actions">

                    <h2>
                        Quick Actions
                    </h2>

                    <div className="action-buttons">

                        <button
                            onClick={() =>
                                navigate("/expenses")
                            }
                        >
                            Manage Expenses
                        </button>

                        <button
                            onClick={() =>
                                navigate("/categories")
                            }
                        >
                            Manage Categories
                        </button>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;