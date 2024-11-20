
import { useSelector } from "react-redux";

export function Product() {
    const dataItem = useSelector((state) => state.getItem.value);

    return (
        <div className="items-grid">

        </div>
    )
}
