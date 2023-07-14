import {useState,useEffect} from "react";
// import {useWorkoutsContext} from "../hooks/useWorkoutsContext";
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import {useParams} from "react-router-dom"
const UpdateForm=()=>{
    // const {dispatch}=useWorkoutsContext();
    
    const [id,setId]=useState();
    const [name,setName]=useState();
    const [category,setCategory]=useState();
    const [price,setPrice]=useState();
    const [error,setError]=useState(null);
    const params=useParams();

useEffect(()=>{
    getProductDetails();
},[])
const getProductDetails=async()=>{
    console.warn(params);
    let result=await fetch(`http://localhost:3000/canteen/food/id/${params.id}`)
    result=await result.json();
    console.warn(result);
    setName(result.name);
    setCategory(result.category);
    setPrice(result.price);
    setId(result.id);
}
const handleSubmit=async(e)=>{
    e.preventDefault();

    const workout={name,category,price,id};
    const response=await fetch('/canteen/food/'+workout.name,{
        method:"PATCH",
        body:JSON.stringify(workout),
        headers:{
            'Content-Type':'application/json'
        }
    })
    // const json=await response.json();
    
    // console.log("ERROR");

    if(!response.ok){
        // setError(json.error)
        console.log("ERROR");
    }
    if(response.ok){
        setId('');
        setName('');
        setPrice('');
        setCategory('');
        setError(null);
        
        console.log("NEW STRING IS ADDED")
        // dispatch({type:'CREATE_WORKOUT',payload:json})
    }
}

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>UPDATE A FOOD ITEM</h3>
            <label> NAME:</label>
            <input
            type="text"
            onChange={(e)=>{setName(e.target.value)}}
            value={name}
            />
            <label> CATEGORY:</label>
            <input
            type="text"
            onChange={(e)=>{setCategory(e.target.value)}}
            value={category}
            />
            <label> PRICE:</label>
            <input
            type="number"
            onChange={(e)=>{setPrice(e.target.value)}}
            value={price}
            />
            <label> ID:</label>
            <input
            type="number"
            onChange={(e)=>{setId(e.target.value)}}
            value={id}
            />
            <button>UPDATE ITEM</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default UpdateForm;