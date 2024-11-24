import "../../styles/Content.css";
import { Item } from "./Item";
import { Route, Routes } from "react-router-dom";
import { Product } from "./Product";

export function Content() {



    return (
        <div className="content">
            <Routes>
                <Route path="/" element={<Item />} />
                <Route path="/products" element={<Product />} />
            </Routes>
        </div>
    )
}