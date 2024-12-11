import { Cart } from './Cart';
import { MdAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useGetItemsQuery } from "../../store/api/api";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/itemsSlice/itemSlice";

const GridItem = ({ item, cart }) => {

    const dispatch = useDispatch();

    const isExists = cart.some(r => r.id === item.id);

    return (
        <div className="item-card">
            <div className="grid-child">
                <h3>{item.name}</h3>
                <p>Количество (шт.): {item.count}</p>
                <p>Количество (в кг): {item.countUnit}</p>
                <p>Стоимость: {item.cost}</p>
            </div>
            {/* <div className="add-to-cart">
                <button className="action-button" onClick={() => setChoosed()} >&minus;</button>{choosed}<button className="action-button">+</button>
            </div> */}
            <button className="action-button" onClick={() => dispatch(actions.addToCartItem(item))} >
                {!isExists ? (<><MdAddShoppingCart />  <span>В корзину</span></>) : (<><MdOutlineRemoveShoppingCart />  <span>Убрать из корзины</span></>)}
            </button>
        </div>
    );
};

export function Item() {
    const { data } = useGetItemsQuery();

    const { cart } = useSelector(state => state);

    const client = useSelector(state => state.client.value);

    return (
        (client.id !== '' && client.id !== undefined)
            ?
            (<>
                <Cart />
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
            )
    )
}
