// Utilizado para CRUD

import { useEffect, useState } from "react";

const empty = {
    name: "",
    category: "",
    price: 0,
    stock: 0,
    description: "",
    isActive: true
};

export default function ProductForm({
    initialValue,
    onSubmit,
    onCancel,
    busy = false
}) {
    const [form, setForm] = useState(empty);

    useEffect(() => {
        setForm(initialValue? {...empty, ...initialValue} : empty);
    }, [initialValue]);

    // Actualiza un campo específico
    function set(key, value) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            name: form.name.trim(),
            category: form.category.trim(),
            price: Number(form.price),
            stock: Number(form.stock),
            description: form.description || "",
            isActive: Boolean(form.isActive)
        });
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* <------------------- Nombre  ------------------>*/}
            <div style={{ display: "grid", gap: 6 }}>
                <label>Nombre:</label>
                <input
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    required
                />
            </div>

            {/* <------------------- Category  ------------------>*/}
            <div style={{ display: "grid", gap: 6 }}>
                <label>Categoría:</label>
                <input
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                    required
                />
            </div>

            {/* <------------------- Price  ------------------>*/}
            <div style={{ display: "grid", gap: 6 }}>
                <label>Precio:</label>
                <input
                    type= "number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => set("price", e.target.value)}
                    required
                />
            </div>

            {/* <------------------- Stock  ------------------>*/}
            <div style={{ display: "grid", gap: 6 }}>
                <label>Inventario:</label>
                <input
                    type= "number"
                    min="0"
                    step="1"
                    value={form.stock}
                    onChange={(e) => set("stock", e.target.value)}
                    required
                />
            </div>

            {/* <------------------- Description  ------------------>*/}
            <div style={{ display: "grid", gap: 6 }}>
                <label>Descripción:</label>
                <input
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    row={3}
                />
            </div>

            {/* <------------------- is Active  ------------------>*/}
            <label style={{ display: "flex", gap:8, alignItems: "center" }}>
            <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => set("isActive", e.target.checked)}
                required
            />
            Activo: </label>

            {/* <------------------- Controles  ------------------>*/}
            <div style={{ display: "flex", gap:10 }}>
                <button type="submit" disabled={busy}>
                    {busy ? "Guardando..." : "Guardar"}
                </button>

                <button type="button" onClick={onCancel} disabled={busy}>
                    Cancelar
                </button>
            </div>
        </form>
    )
}