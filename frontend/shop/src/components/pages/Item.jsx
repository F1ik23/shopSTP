import { FaShoppingCart } from "react-icons/fa";
import { useGetItemsQuery } from "../../store/api/api";
import { useState } from "react";

const GridItem = ({ item }) => {

    // const [choosed, setChoosed] = useState(0);

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
            <button className="action-button" ><FaShoppingCart /> В корзину</button>
        </div>
    );
};

export function Item() {
    const { data } = useGetItemsQuery();


    return (
        <div className="items-grid">
            {data && data.map((item) => (
                <GridItem key={item.id} item={item} />
            ))}
        </div>
    )
}
