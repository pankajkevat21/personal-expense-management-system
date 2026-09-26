import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Expenses() {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        amount: '',
        categoryId: '',
        expenseDate: new Date().toISOString().split('T')[0],
        description: '',
        paymentMethod: 'UPI',
        currency: 'INR',
    });
    const [editingId, setEditingId] = useState(null);

    const fetchData = async () => {
        try {
            const [expRes, catRes] = await Promise.all([
                api.get('/expenses'),
                api.get('/categories'),
            ]);
            setExpenses(expRes.data.content || expRes.data);
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
            category: { id: parseInt(form.categoryId) },
            expenseDate: form.expenseDate,
            description: form.description,
            paymentMethod: form.paymentMethod,
            currency: form.currency,
        };

        try {
            if (editingId) {
                await api.put(`/expenses/${editingId}`, payload);
            } else {
                await api.post('/expenses', payload);
            }
            setForm({
                amount: '',
                categoryId: '',
                expenseDate: new Date().toISOString().split('T')[0],
                description: '',
                paymentMethod: 'UPI',
                currency: 'INR',
            });
            setEditingId(null);
            fetchData();
        } catch (err) {
            alert('Failed: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleEdit = (exp) => {
        setEditingId(exp.id);
        setForm({
            amount: exp.amount,
            categoryId: exp.category?.id || '',
            expenseDate: exp.expenseDate,
            description: exp.description || '',
            paymentMethod: exp.paymentMethod || 'UPI',
            currency: exp.currency || 'INR',
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this expense?')) return;
        await api.delete(`/expenses/${id}`);
        fetchData();
    };

    return (
        <div className="page">
            <h2>Expenses</h2>

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
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
                <input
                    name="expenseDate"
                    type="date"
                    value={form.expenseDate}
                    onChange={handleChange}
                    required
                />
                <input
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />
                <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
                    <option value="UPI">UPI</option>
                    <option value="CASH">Cash</option>
                    <option value="CARD">Card</option>
                    <option value="NET_BANKING">Net Banking</option>
                </select>
                <button type="submit">{editingId ? 'Update' : 'Add'}</button>
                {editingId && (
                    <button type="button" onClick={() => { setEditingId(null); setForm({ amount: '', categoryId: '', expenseDate: new Date().toISOString().split('T')[0], description: '', paymentMethod: 'UPI', currency: 'INR' }); }}>
                        Cancel
                    </button>
                )}
            </form>

            <table className="data-table">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {expenses.map((exp) => (
                    <tr key={exp.id}>
                        <td>{exp.expenseDate}</td>
                        <td>{exp.category?.name}</td>
                        <td>₹ {exp.amount}</td>
                        <td>{exp.paymentMethod}</td>
                        <td>{exp.description}</td>
                        <td>
                            <button onClick={() => handleEdit(exp)}>Edit</button>
                            <button onClick={() => handleDelete(exp.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}