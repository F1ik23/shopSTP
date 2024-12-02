import { useGetItemsQuery } from "../../store/api/api";
import "../../styles/Item.css";


const GridItem = ({ item }) => {
    return (
        <div className="grid-child">
            <h3>{item.name}</h3>
            <p>ID: {item.id}</p>
        </div>
    );
};

export function Item() {
    const {data} = useGetItemsQuery();

    // const items = [
    //     {id: 1, name: 'Element 1'},
    //     {id: 2, name: 'Element 2'},
    //     {id: 3, name: 'Element 3'},
    //     {id: 4, name: 'Element 4'},
    //     {id: 5, name: 'Element 5'},
    //     {id: 6, name: 'Element 6'},
    //     {id: 7, name: 'Element 7'},
    // ];

    return (
        <div className="items-grid">
            {data && data.map((item) => (
                <GridItem key={item.id} item={item} />
            ))}
        </div>
    )
}
