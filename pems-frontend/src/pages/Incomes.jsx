import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Incomes() {
    const [incomes, setIncomes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        amount: '',
        incomeCategoryId: '',
        incomeDate: new Date().toISOString().split('T')[0],
        description: '',
        paymentMethod: 'BANK_TRANSFER',
    });

    const fetchData = async () => {
        try {
            const [incRes, catRes] = await Promise.all([
                api.get('/incomes'),
                api.get('/income-categories'),
            ]);
            setIncomes(incRes.data.content || incRes.data);
            setCategories(catRes.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            amount: parseFloat(form.amount),
            incomeCategory: { id: parseInt(form.incomeCategoryId) },
            incomeDate: form.incomeDate,
            description: form.description,
            paymentMethod: form.paymentMethod,
        };

        try {
            await api.post('/incomes', payload);
            setForm({
                amount: '',
                incomeCategoryId: '',
                incomeDate: new Date().toISOString().split('T')[0],
                description: '',
                paymentMethod: 'BANK_TRANSFER',
            });
            fetchData();
        } catch (err) {
            alert('Failed: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this income?')) return;
        await api.delete(`/incomes/${id}`);
        fetchData();
    };

    return (
        <div className="page">
            <h2>Incomes</h2>

            <form className="form-row" onSubmit={handleSubmit}>
                <input
                    name="amount"
                    type="number"
                    step="0.01"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                />
                <select
                    name="incomeCategoryId"
                    value={form.incomeCategoryId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                <input
                    name="incomeDate"
                    type="date"
                    value={form.incomeDate}
                    onChange={handleChange}
                    required
                />
                <input
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />
                <button type="submit">Add Income</button>
            </form>

            <table className="data-table">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {incomes.map((inc) => (
                    <tr key={inc.id}>
                        <td>{inc.incomeDate}</td>
                        <td>{inc.incomeCategory?.name}</td>
                        <td>₹ {inc.amount}</td>
                        <td>{inc.description}</td>
                        <td>
                            <button onClick={() => handleDelete(inc.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}