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
    const api_url = "https://crudcrud.com/api/de409ec4562d423bb01dbe1f1145ae25";

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
                setList(data);
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