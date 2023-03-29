import React, { useContext, useEffect, useReducer } from "react";
import CandyContext from "./candy-context";

const CartContext = React.createContext({
    itemList: [],
    addInCart: () => { },
    removeFromCart: () => { },
    updateInCart: () => { }
})

export default CartContext;

const cartReducer = (state, action) => {
    if (action.type === "add") {
        state.list = [...state.list, action.item];
        state.totalAmount = state.totalAmount + (+action.item.quantity * +action.item.price)
        return {
            list: state.list,
            totalAmount: state.totalAmount
        }
    }
    else if (action.type === "update") {
        const itemIndex = state.list.findIndex((item) => {
            return item._id.toString() === action.id.toString();
        })

        state.list[itemIndex].quantity += parseInt(action.quantity);
        state.totalAmount += parseInt(state.list[itemIndex].price) * parseInt(action.quantity);

        return {
            list: state.list,
            totalAmount: state.totalAmount
        }
    }
    else if (action.type === "remove") {
        const findIndex = state.list.findIndex((item) => {
            return item._id.toString() === action.id;
        })
        state.totalAmount -= parseInt(state.list[findIndex].quantity) * parseInt(state.list[findIndex].price)
        const newList = [...state.list];
        newList.splice(findIndex, 1);
        return {
            list: newList,
            totalAmount: state.totalAmount
        }
    }
    else if (action.type === "firstFetch") {
        state.list = [...action.items];
        state.totalAmount = action.items.reduce((init, item) => {
            return init + (parseInt(item.quantity) * parseInt(item.price));
        }, 0)

        return {
            list: state.list,
            totalAmount: state.totalAmount
        }
    }
    return {
        list: [],
        totalAmount: 0
    }
}

const CartContextProvider = (props) => {
    const [items, dispatchCart] = useReducer(cartReducer, {
        list: [],
        totalAmount: 0
    })

    const addInCart_handler = (obj) => {
        dispatchCart({ type: "add", item: obj })
    }

    const updateInCart_handler = (id, quantity) => {
        dispatchCart({ type: "update", id: id, quantity: quantity })
    }

    const removeFromCart_handler = (id) => {
        dispatchCart({ type: "remove", id: id })
    }

    const candyCtx = useContext(CandyContext);

    const api = candyCtx.api_url;
    useEffect(() => {
        const firstFetching = async () => {
            try {
                let res = await fetch(api + "/cart2");
                let data = await res.json();
                if (!res.ok) {
                    throw new Error("unable to fetch cart items");
                }
                dispatchCart({ type: "firstFetch", items: data })
            }
            catch (err) {
                alert(err.message);
            }
        }
        firstFetching();
    }, [api])

    return (
        <CartContext.Provider value={{
            itemList: items.list,
            totalAmount: items.totalAmount,
            addInCart: addInCart_handler,
            removeFromCart: removeFromCart_handler,
            updateInCart: updateInCart_handler
        }}>
            {props.children}
        </CartContext.Provider>
    )
}

export { CartContextProvider };