import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const COLORS = [
    '#2563eb', '#16a34a', '#dc2626', '#f59e0b',
    '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16',
];

export default function Dashboard() {
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/dashboard')
            .then(res => setData(res.data))
            .catch(err => {
                console.error(err);
                if (err.response?.status === 401) {
                    localStorage.clear();
                    navigate('/login');
                }
            });
    }, []);

    if (!data) return <p style={{ padding: '20px' }}>Loading...</p>;

    const categoryExpenseData = Object.entries(data.categoryWiseExpense || {})
        .map(([name, value]) => ({ name, value }));

    const categoryIncomeData = Object.entries(data.categoryWiseIncome || {})
        .map(([name, value]) => ({ name, value }));

    const compareData = [
        { name: 'Total', Income: Number(data.totalIncome), Expense: Number(data.totalExpense) },
        { name: 'Monthly', Income: Number(data.monthlyIncome), Expense: Number(data.monthlyExpense) },
    ];

    return (
        <div className="page">
            <h2>Dashboard</h2>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <div className="card">
                    <h4>Total Income</h4>
                    <p style={{ color: '#16a34a', fontSize: '22px', fontWeight: 'bold' }}>
                        ₹ {data.totalIncome ?? 0}
                    </p>
                </div>
                <div className="card">
                    <h4>Total Expense</h4>
                    <p style={{ color: '#dc2626', fontSize: '22px', fontWeight: 'bold' }}>
                        ₹ {data.totalExpense ?? 0}
                    </p>
                </div>
                <div className="card">
                    <h4>Net Savings</h4>
                    <p style={{
                        color: Number(data.netSavings) >= 0 ? '#16a34a' : '#dc2626',
                        fontSize: '22px',
                        fontWeight: 'bold'
                    }}>
                        ₹ {data.netSavings ?? 0}
                    </p>
                </div>
                <div className="card">
                    <h4>Monthly Income</h4>
                    <p>₹ {data.monthlyIncome ?? 0}</p>
                </div>
                <div className="card">
                    <h4>Monthly Expense</h4>
                    <p>₹ {data.monthlyExpense ?? 0}</p>
                </div>
                <div className="card">
                    <h4>Monthly Savings</h4>
                    <p>₹ {data.monthlySavings ?? 0}</p>
                </div>
                <div className="card">
                    <h4>Today's Expense</h4>
                    <p>₹ {data.todayExpense ?? 0}</p>
                </div>
                <div className="card">
                    <h4>Total Transactions</h4>
                    <p>{data.totalTransactions ?? 0}</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

                <div className="card">
                    <h3>Expense by Category</h3>
                    {categoryExpenseData.length === 0 ? (
                        <p>No data</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryExpenseData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {categoryExpenseData.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>

                <div className="card">
                    <h3>Income by Category</h3>
                    {categoryIncomeData.length === 0 ? (
                        <p>No data</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryIncomeData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {categoryIncomeData.map((_, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>

                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <h3>Income vs Expense</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={compareData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Income" fill="#16a34a" />
                            <Bar dataKey="Expense" fill="#dc2626" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
}