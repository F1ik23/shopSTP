import { AddButton } from "./buttons/AddButton";
import { DeleteButton } from "./buttons/DeleteButton";
import { EditButton } from "./buttons/EditButton";

export function ActionBar() {

    return(
        <>
            <AddButton />
            <EditButton />
            <DeleteButton />
        </>
    )
}