import "../../assets/styles/interfazstyle.css"
import { useEffect, useState } from "react";

const empty = {
    id:"",
    name: "",
    stock: 0,
    price: 0
};

export default function PaquetesForm({
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
            id: form.id.trim(),
            name: form.name.trim(),
            stock: Number(form.stock),
            price: Number(form.price)
        });
    }

    return (
        <form onSubmit={handleSubmit} className="form-paquetes">
            
            {/* <------------------- ID  ------------------>*/}
            <div className="form-group">
                <label>ID:</label>
                <input
                    value={form.id}
                    onChange={(e) => set("id", e.target.value)}
                    required
                />
            </div>

            {/* <------------------- Nombre  ------------------>*/}
            <div className="form-group">
                <label>Nombre:</label>
                <input
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    required
                />
            </div>

            {/* <------------------- Stock  ------------------>*/}
            <div className="form-group">
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

            {/* <------------------- Price  ------------------>*/}
            <div className="form-group">
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

            {/* <------------------- Botones  ------------------>*/}
            <div className="form-actions">
                <button type="submit" className="save-btn" disabled={busy}>
                    {busy ? "Guardando..." : "Guardar"}
                </button>

                <button type="button" className="delete-btn" onClick={onCancel} disabled={busy}>
                    Cancelar
                </button>
            </div>
        </form>
    )
}