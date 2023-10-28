import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const Cards = ({url}) => {
  //declare constants
    const [data, setData] = useState([])
    const [color, setColor] = useState("red")

    //obtiene la data para mostrar en el card de la lista de pokemones de la pagina home
    const getData = async() => {
        const response = await axios.get(url);
        if(response.status === 200) {
          getColor(response.data?.species.url)
          setData(response.data) 
        }  
    }

    //Se obtiene el color del pokemon
    const getColor =  async (url) => {
      const response = await axios.get(url);
      response.status === 200 ?
      setColor(response.data?.color.name):
      "error"
    }

    useEffect(()=> {
        getData();
    },[])

  return (
    <Link to={`/pokemon/${data.id}`} >
    <article className="card" style={{border: `3px solid gray`, boxShadow: `0px 0px 2px 2px ${color}`  }} >
      <div className="card-half">
        <img
          src={data.sprites?.other.dream_world.front_default}
          alt={
            data.name
           }
           loading="lazy"
        />
        <h2>{data.name}</h2>
        <h3>{ data.types?.map( (item, index) => index=== 0 && item.type.name  ) }</h3>
        <p>type</p>
        <div className="hr"></div>
        <div className="card-central">
          <div className="row">
            <div>
              <p>HP</p>
              <p>{ data.stats?.map( (item, index) => index=== 0 && item.base_stat  ) }</p>
            </div>
            <div>
              <p>Defensa</p>
              <p>{ data.stats?.map( (item, index) => index=== 2 && item.base_stat  ) }</p>
            </div>
          </div>
          
          <div className="row">
            <div>
              <p>Ataque</p>
              <p>{ data.stats?.map( (item, index) => index=== 1 && item.base_stat  ) }</p>
            </div>
            <div>
              <p>Speed</p>
              <p>{ data.stats?.map( (item, index) => index=== 5 && item.base_stat  ) }</p>
            </div>
          </div>
        </div>
      </div>
    </article>
    </Link>
  )
}

export default Cards