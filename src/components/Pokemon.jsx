import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const Pokemon = () => {
  //declare constants
  const [data, setData] = useState({}); 
  const {id} = useParams()

  //Se obtiene la data para mostrar el detalle
  const getData = async () => {
    
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    response.status === 200 ?
    setData(response.data):
    "error"
  }
  useEffect( ()=> {
    getData()
  }, [])

  return (
    <>
    {/* <Navbar/> */}
    <div className="container">
    <div className="main">
      <div className="main-content-detail">
        <div className="content-detail-perfil">
          <article className="card-detail">
            <div className="card-detail-half">
              <img
                src={data.sprites?.other.dream_world.front_default}
                alt={data.name}
              />
              {/* <div className="hr"></div> */}
              <div className="card-detail-central">
                <div className="detail-title">
                  <span>#{data.id}</span>
                  <h2>{data.name}</h2>
                </div>
                <div className="weight-height">
                  <div className="weight">
                    <p>Peso</p>
                    <p>{data.weight}</p>
                  </div>
                  <div className="height">
                    <p>Altura</p>
                    <p>{data.height}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <div className="container-baby">
            <article className="card-baby">
              <h3>Type</h3>
              <div className="button-baby">
                {
                  data.types?.map( item => <button className="btn-items" key={item.type.name}>{item.type.name}</button> )
                }
              </div>
            </article>
            <article className="card-baby">
            <h3>Abilities</h3>
              <div className="button-baby">
              {
                  data.abilities?.map( item => <button className="btn-items" key={item.ability.name} >{item.ability.name}</button> )
                }
              </div>
            </article>
          </div>
        </div>
        <div className="content-detail-movements">
          <aside className="aside">
            <div className="content-aside">
              <div className="aside-title"><h3>Movements</h3></div>
              <div className="aside-body">
              {
                  data.moves?.map( (item, index) => index < 15 && <button className="btn-items" key={item.move.name} >{item.move.name}</button> )
                }
              </div>
              
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
  </>
  )
}

export default Pokemon