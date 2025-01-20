import { Item } from "./Item";
import { Route, Routes } from "react-router-dom";
import { Product } from "./items/Product";
import { Client } from "./clients/Client";
import { Order } from "./orders/Order";

export function Content() {



    return (
        <div className="content">
            <Routes>
                <Route path="/" element={<Item />} />
                <Route path="/products" element={<Product />} />
                <Route path="/clients" element={<Client />} />
                <Route path="/orders" element={<Order />} />
            </Routes>
        </div>
    )
}