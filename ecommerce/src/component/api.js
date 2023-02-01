import axios from "axios";
import { useEffect, useState } from "react"

const count = 1;
const LoadProducts = () =>{
    const [state, setState] = useState([]);
    useEffect(()=>{
        axios
        .get("https://dummyjson.com/products")
        .then((data)=>{
            setState(data.data.products);
        })
    }, [count]);
    state.sort((item1, item2)=>{
        return item2.rating - item1.rating;
    })
    return state;
}

export {LoadProducts};