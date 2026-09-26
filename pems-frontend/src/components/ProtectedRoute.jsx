import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    // Agar token nahi hai, toh login page par bhej do
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}