import { Link } from "react-router-dom";
import ProductForm from "../components/ProductForm";

export default function Products() {
    return (
        <div className="main">
            <h2> Productos</h2>
            <ProductForm />
        </div>
    )
};