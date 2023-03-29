import React, { useContext } from "react";
import ReactDom from "react-dom";
import CartContext from "../store/cart-context";
import CandyContext from "../store/candy-context";

const CartBox = (props) => {
    const cartCtx = useContext(CartContext);
    const candyCtx = useContext(CandyContext);

    const removeFromCart = async (e) => {
        e.preventDefault();
        const itemId = e.target.parentElement.lastElementChild.textContent;
        try {
            let res = await fetch(candyCtx.api_url + "/cart2/" + itemId, {
                method: 'DELETE'
            })
            if (!res.ok) {
                throw new Error("unable to remove from cart");
            }
            cartCtx.removeFromCart(itemId);
        }
        catch (err) {
            alert(err.message);
        }
    }

    return (
        <React.Fragment >
            <div className="cart">
                <button onClick={props.onClick}>Close Cart</button>
                <ul>
                    {cartCtx.itemList.map((item) => {
                        return <li key={item._id}>
                            <p hidden>{item.shopId}</p>
                            <p>
                                <span>{item.name}</span> - <span>{item.descr}</span> - <span>{item.price}</span>
                            </p>
                            <p>
                                quantity = x <span>{item.quantity}</span>
                            </p>
                            <button onClick={removeFromCart}>remove</button>
                            <p hidden>{item._id}</p>
                        </li>
                    })}
                </ul>
                <h2>Total Amount = Rs. {cartCtx.totalAmount.toFixed(2)}</h2>
            </div>
        </React.Fragment>
    )
}

export default function Cart(props) {
    return (
        <React.Fragment>
            {ReactDom.createPortal(<CartBox onClick={props.onClick} />, document.getElementById("cart"))}
        </React.Fragment>
    )
}
