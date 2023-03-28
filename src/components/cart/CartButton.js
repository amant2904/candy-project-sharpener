import React from 'react'

export default function CartButton(props) {
    return (
        <div style={{ margin: "30px 10px", paddin: "10px" }}>
            <button onClick={props.onClick}>Open Cart</button>
        </div>
    )
}
