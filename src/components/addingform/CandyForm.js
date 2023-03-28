import React, { useContext } from 'react'
import { useRef } from 'react'
import CandyContext from '../store/candy-context';

export default function CandyForm() {
    const candyName = useRef();
    const candyDesc = useRef();
    const candyPrice = useRef();

    const candyCtx = useContext(CandyContext);

    const candyAdding_handler = async (e) => {
        e.preventDefault();

        const candyDetail = {
            name: candyName.current.value,
            desc: candyDesc.current.value,
            price: candyPrice.current.value
        }

        try {
            let res = await fetch(candyCtx.api_url + "/candylist", {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(candyDetail)
            });
            let data = await res.json();
            if (!res.ok) {
                throw new Error("Something wrong in adding candy in shop");
            }
            candyCtx.addCandy_handler(data);
        }
        catch (err) {
            alert(err.message);
        }
    }

    return (
        <form onSubmit={candyAdding_handler}>
            <label htmlFor="candyName">Candy Name</label>
            <input type="text" name="candyName" id="candyName" ref={candyName} />
            <label htmlFor="desc">Description</label>
            <input type="text" name="desc" id="desc" ref={candyDesc} />
            <label htmlFor="price">Price</label>
            <input type="number" name="price" id="price" ref={candyPrice} />
            <button type="submit">Add Candy In Store</button>
        </form>
    )
}
