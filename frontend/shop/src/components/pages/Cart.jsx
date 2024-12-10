import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import Modal from "../diff_comps/Modal";
import { useSetOrderMutation } from "../../store/api/orders.api";

export const Cart = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { cart } = useSelector(state => state);
    const { client } = useSelector(state => state);

    const [setOrder] = useSetOrderMutation();

    const toggleCart = () => setIsOpen(!isOpen);

    const totalPrice = cart.reduce((total, item) => total + item.cost, 0);

    const handleClickOrder = () => {
        if (cart.length > 0) {
            const cart_id = [];
            cart.map((item) => (
                cart_id.push(item.id)
            ))
            const body = {
                date: new Date(),
                state: 'WAITING',
                client_id: client.id,
                items: cart
            }
            setOrder(body).unwrap()
            .then(() => {
                setIsOpen(false);
            })
            .catch((error) => {
                alert(error.status + ' ' + error.data.message)
            })
        }
    }

    return (
        <div className="cart">
            <div className="cart-line">
                <button className="cart-button" onClick={toggleCart}><FaShoppingCart /><span className="cart-text">{cart.length}</span></button>
            </div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <Modal.Header close={() => setIsOpen(false)}>
                    <h2>Ваша корзина</h2>
                </Modal.Header>
                <Modal.Body>
                    <ul className="cart-items">
                        {cart.map((item, index) => (
                            <li key={index} className="cart-item">
                                <span>{item.name}</span>
                                <span>: стоимость - {item.cost} ₽</span>
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <strong>Итого:</strong> {totalPrice} ₽
                    <button className="order-button" onClick={handleClickOrder}>Заказать</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
