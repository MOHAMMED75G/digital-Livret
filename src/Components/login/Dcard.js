import React  from "react"
import { Link } from "react-router-dom"
// import Sdata from "./Sdata"
import { useParams } from "react-router-dom";
import "./dcard.css";
const Cards = ({ item: { id, image, title } }) => {
  const { livretId} = useParams();
  return (
    <>
      <div className='items'>
        <div className='image2'>
          <Link to={`/livret/${id}/${livretId}`} >
          <img src={image} alt='' />
          <p>{title} </p>
          </Link>
        </div>
      
      </div>
    </>
  )
}




export default Cards