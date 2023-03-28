import React, { useContext } from 'react'
import CandyContext from '../store/candy-context'
import CandyListItem from './CandyListItem';

export default function CandyList() {
    const candyCtx = useContext(CandyContext);

    return (
        <div style={{ margin: "20px", border: "2px solid black", padding: "20px" }}>
            <ul>
                {candyCtx.candyList.map((candy) => {
                    return <CandyListItem key={candy._id} detail={candy} />
                })}
            </ul>
        </div>
    )
}
