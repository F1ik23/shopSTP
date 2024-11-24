import "../../styles/Product.css"
import { IoIosRemove } from "react-icons/io";
import { AddButton } from "../buttons/AddButton";
import { EditButton } from "../buttons/EditButton";

export function ActionBar() {

    return(
        <div className="action-bar">
            <AddButton />
            <EditButton />
            <button className="action-button"><IoIosRemove /></button>
        </div>
    )
}