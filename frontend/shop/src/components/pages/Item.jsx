import { useGetItemsQuery } from "../../store/api/api";

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

    return (
        <div className="items-grid">
            {data && data.map((item) => (
                <GridItem key={item.id} item={item} />
            ))}
        </div>
    )
}
