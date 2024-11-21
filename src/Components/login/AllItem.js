import React, { useState } from "react"
import Dcards from "./Dcard"
import "../gallery/Gallery.css"
import "./Destinations.css"
import Sdata from "./Sdata"
import QRCode from "react-qr-code";
import{ Link }from "react-router-dom";
import { useParams } from "react-router-dom";

function Code() {
  const { livretId} = useParams();
  const [state, setState] = useState({
      value: `/http://localhost:3000/here-livret/${livretId}`,
      size: 256,
      bgColor: '#0a639eda',
      fgColor: 'white'
  })
return (
    <div className='code'>
      <p>Scannez votre
QRcode</p>
        {/* <div className="inputs">
            <input type="text" value={state.value} onChange={(e) => setState({ value: e.target.value })} placeholder='Msg' />  
            {/* <input type="number" value={state.size} onChange={(e) => setState({ size: e.target.value })} placeholder='size of Qr code' />  
            <input type="color" value={state.bgColor} onChange={(e) => setState({ bgColor: e.target.value })} placeholder='BackGround Color' />  
            <input type="color" value={state.fgColor} onChange={(e) => setState({ fgColor: e.target.value })} placeholder='Text color' /> </div>   */}
        *
        <div className="card3">
        <QRCode
            value={state.value}
            bgColor={state.bgColor}
            fgColor={state.fgColor}
            size={state.size}
        />
        </div>
        
        <p>On vous conseille quand même d'ajouter d'abord des modules 😄</p>
        <Link  to={`/here-livret/${livretId}`}  >  <button  className="btn">go to your livret</button></Link>
  </div>
)
}
const AllItem = () => {
  const [items, setIems] = useState(Sdata)
  return (
    <>
      <section className='gallery desi mtop'>
      <div className='containergrid'>
         
         <div  className="containe">
         <div className="card1">
            <Code/>
         </div>
            
         </div>
        
        <div className='containe'>
        <div className="card2">
          <div className='content grid'>
          
            {items.map((item) => {
              return <Dcards key={item.id} item={item} />
            })}
          </div>
          </div>
        </div>
        </div>
      </section>
    </>
  )
}

export default AllItem

/*
import React, { useState } from "react"
import Dcards from "./Dcards"
import "../gallery/Gallery.css"
import "./Destinations.css"
import HeadTitle from "../../Common/HeadTitle/HeadTitle"
import Sdata from "../Destinations/Sdata"

const Destinations = () => {
  const [items, setIems] = useState(Sdata)
  return (
    <>
      <HeadTitle />
      <section className='gallery desi top'>
        <div className='container'>
          <div className='content grid'>
            {items.map((item) => {
              return <Dcards key={item.id} item={item} />
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Destinations*/