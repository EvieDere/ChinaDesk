import "../../assets/styles/interfazstyle.css"
import { useEffect, useState } from "react";

const empty = {
    id: "",
    name: "",
    available: true
};

export default function AvailForm({
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
            available: Boolean(form.available)
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

            {/* <------------------- Price  ------------------>*/}
            <div className="form-group">
                <label>Disponible:</label>
                <select>
                    value={form.available}
                    onChange={(e) => set("available", e.target.value === "true")}
                
                    <option value="true">Disponible</option>
                    <option value="false">No disponible</option>
                </select>
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