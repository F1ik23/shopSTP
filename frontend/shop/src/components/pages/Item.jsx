import { Cart } from './Cart';
import { MdAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useGetItemsQuery } from "../../store/api/api";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/itemsSlice/itemSlice";
import { useGetRandomClientQuery } from '../../store/api/clients.api';
import { useState } from 'react';

const GridItem = ({ item, cart }) => {

    const [choosed, setChoosed] = useState(1);

    const dispatch = useDispatch();

    const minusChoosed = () => {
        if (choosed === 1) return;
        else setChoosed(choosed - 1);
    }

    const plusChoosed = () => {
        if (choosed === item.count) return;
        else setChoosed(choosed + 1);
    }

    const isExists = cart.some(r => r.id === item.id);

    return (
        <div className="item-card">
            <div className="grid-child">
                <h3>{item.name}</h3>
                <p>Количество на складе (шт.): {item.count || '-'}</p>
                <p>Количество на складе (в кг): {item.countUnit || '-'}</p>
                <p>Стоимость: {item.cost}</p>
            </div>
            <div className="add-to-cart">
                <button className="action-button" onClick={minusChoosed} >&minus;</button>{choosed}<button className="action-button" onClick={plusChoosed}>+</button>
            </div>
            <button className="action-button" onClick={() => { dispatch(actions.addToCartItem(item))}} >
                {!isExists ? (<><MdAddShoppingCart />  <span>В корзину</span></>) : (<><MdOutlineRemoveShoppingCart />  <span>Убрать из корзины</span></>)}
            </button>
        </div>
    );
};

export function Item() {
    const { data } = useGetItemsQuery();
    const { data: client } = useGetRandomClientQuery();

    const { cart } = useSelector(state => state);

    return (
        (client &&
            (client.id !== '' && client.id !== undefined)
            ?
            (<>
                <Cart client={client} />
                <div className="items-grid">
                    {data && data.map((item) => (
                        <GridItem key={item.id} item={item} cart={cart} />
                    ))}
                </div>
            </>)
            :
            (
                <div className='no-clients'>
                    Клиентов пока нет...
                </div>
            ))
    )
}
