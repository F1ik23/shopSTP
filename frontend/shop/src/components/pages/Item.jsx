import { Cart } from './Cart';
import { MdAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useGetItemsQuery } from "../../store/api/api";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/itemsSlice/itemSlice";
import { useGetRandomClientQuery } from '../../store/api/clients.api';
import { useState } from 'react';
import InputNumber from '../diff_comps/InputNumber';

const GridItem = ({ item, cart }) => {

    const [choosed, setChoosed] = useState(1);
    const [choosedUnit, setChoosedUnit] = useState(0.0);

    const dispatch = useDispatch();

    const minusChoosed = () => {
        if (choosed === 1) return;
        else setChoosed(choosed - 1);
        setCartItem({...cartItem, count: choosed});
    }


    const [cartItem, setCartItem] = useState({
        item_id: item.id,
        item: item,
        name: item.name,
        price: item.cost,
        count: item.count > 0 ? choosed : 0,
        countUnit: item.countUnit > 0 ? choosedUnit : 0,
    })

    const plusChoosed = () => {
        if (choosed === item.count) return;
        else setChoosed(choosed + 1);
        setCartItem({...cartItem, count: choosed});
    }

    const isExists = cart.some(r => r.item_id === cartItem.item_id);

    return (
        <div className="item-card">
            <div className="grid-child">
                <h3>{item.name}</h3>
                <p>Количество на складе (шт.): {item.count || '-'}</p>
                <p>Количество на складе (в кг): {item.countUnit || '-'}</p>
                <p>Стоимость: {item.cost}</p>
            </div>
            <div className="add-to-cart">
                <button className="action-button"  onClick={minusChoosed} disabled={item.count > 0 ? false : true} >&minus;</button>{choosed} шт.<button className="action-button" disabled={item.count > 0 ? false : true} onClick={plusChoosed}>+</button>
                </div>
            <InputNumber min={0.0} max={item.countUnit} allowDecimal placeholder='Для заказа в кг.' disabled={item.countUnit > 0.0 ? false : true} onChange={(e) => setCartItem({...cartItem, countUnit: e})} />
            <button className="action-button" onClick={() => { dispatch(actions.addToCartItem(cartItem))}} disabled={item.count || item.countUnit > 0 ? false : true}>
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
