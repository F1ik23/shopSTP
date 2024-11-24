import { Link } from "react-router-dom";


export function Navigation() {

    return (
        <header>
            <ul id="navbar">
                <li className="link"><Link to='/'>Главная</Link></li>
                <li className="link"><Link to='/clients'>Клиенты</Link></li>
                <li className="link"><Link to='/products'>Товары</Link></li>
                <li className="link"><Link to='/orders'>Заказы</Link></li>
            </ul>
            <hr className="bottom-line" />
        </header>
    )
}


