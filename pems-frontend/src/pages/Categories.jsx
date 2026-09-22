import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function Categories() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");

    const user =
        JSON.parse(localStorage.getItem("user")) || {};

    useEffect(() => {

        if (!localStorage.getItem("token")) {
            navigate("/");
            return;
        }

        loadCategories();

    }, [navigate]);


    const loadCategories = async () => {

        try {

            const data = await api.getCategories();

            setCategories(data);

        } catch (error) {

            setError(error.message);

        }
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            if (editingId) {

                await api.updateCategory(
                    editingId,
                    {
                        name: name
                    }
                );

            } else {

                await api.createCategory(
                    {
                        name: name
                    }
                );
            }

            setName("");
            setEditingId(null);

            await loadCategories();

        } catch (error) {

            setError(error.message);

        }
    };


    const handleEdit = (category) => {

        setEditingId(category.id);

        setName(category.name);
    };


    const handleDelete = async (id) => {

        if (!window.confirm(
            "Are you sure you want to delete this category?"
        )) {
            return;
        }

        try {

            await api.deleteCategory(id);

            await loadCategories();

        } catch (error) {

            setError(error.message);

        }
    };


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };


    return (

        <div className="categories-page">

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
                        className="active-nav"
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

            <main className="categories-content">

                <div className="categories-header">

                    <div>

                        <h1>
                            {editingId
                                ? "Edit Category"
                                : "Add Category"}
                        </h1>

                        <p>
                            Create and manage your expense categories
                        </p>

                    </div>

                </div>


                {error && (

                    <p className="categories-error">
                        {error}
                    </p>

                )}


                <form
                    className="categories-form"
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        placeholder="Category name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />

                    <button type="submit">

                        {editingId
                            ? "Update Category"
                            : "Add Category"}

                    </button>


                    {editingId && (

                        <button
                            type="button"
                            onClick={() => {

                                setEditingId(null);
                                setName("");

                            }}
                        >
                            Cancel
                        </button>

                    )}

                </form>


                <section className="categories-section">

                    <div className="categories-section-header">

                        <h2>
                            Categories
                        </h2>

                        <span>

                            {categories.length}{" "}

                            {categories.length === 1
                                ? "Category"
                                : "Categories"}

                        </span>

                    </div>


                    {categories.length === 0 ? (

                        <p className="categories-empty">
                            No categories found.
                        </p>

                    ) : (

                        <div className="categories-list">

                            {categories.map(category => (

                                <div
                                    className="categories-item"
                                    key={category.id}
                                >

                                    <div className="categories-item-info">

                                        <div className="categories-icon">

                                            {category.name
                                                .charAt(0)
                                                .toUpperCase()}

                                        </div>

                                        <span>
                                            {category.name}
                                        </span>

                                    </div>


                                    <div className="categories-item-actions">

                                        <button
                                            className="categories-edit-button"
                                            onClick={() =>
                                                handleEdit(category)
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            className="categories-delete-button"
                                            onClick={() =>
                                                handleDelete(
                                                    category.id
                                                )
                                            }
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

export default Categories;