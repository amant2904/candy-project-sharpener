import React, { useEffect, useState } from "react";

const CandyContext = React.createContext({
    candyList: [],
    addCandy_handler: () => { },
    removeCandy_handler: () => { },
    api_url: null
})
export default CandyContext;


const CandyContextProvider = (props) => {
    const [list, setList] = useState([]);
    const api_url = "https://crudcrud.com/api/632e2e97ea0e4bae9829f6df416b5cd2";

    const addCandy_handler = (details) => {
        setList((prv) => {
            return [...prv, details]
        })
    }

    const removeCandy_handler = (id) => {
        const findIndex = list.findIndex((item) => {
            return item._id.toString() === id.toString();
        })
        const newList = [...list];
        newList.splice(findIndex, 1);
        setList(newList);
    }

    useEffect(() => {
        const firstFetcher = async () => {
            try {
                let res = await fetch(api_url + "/candylist");
                let data = await res.json();
                if (!res.ok) {
                    throw new Error("unable to fetch candy list")
                }
                const newList = [...data];
                const cartRes = await fetch(api_url + "/cart2");
                const cartData = await cartRes.json();
                // console.log(data);
                // console.log(cartData);
                // console.log(newList);
                for (let i = 0; i < cartData.length; i++) {
                    for (let j = 0; j < newList.length; j++) {
                        if (newList[j]._id.toString() === cartData[i].shopId.toString()) {
                            newList[j] = {
                                ...newList[j],
                                cartId: cartData[i]._id
                            }
                        }
                    }
                }
                // console.log(newList);
                setList(newList);
            }
            catch (err) {
                alert(err.message);
            }

        }
        firstFetcher();
    }, [api_url])

    return (
        <CandyContext.Provider value={{
            candyList: list,
            addCandy_handler: addCandy_handler,
            removeCandy_handler: removeCandy_handler,
            api_url: api_url
        }}>
            {props.children}
        </CandyContext.Provider>
    )
}

export { CandyContextProvider };