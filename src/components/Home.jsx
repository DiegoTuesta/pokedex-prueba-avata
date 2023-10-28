import { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cards from "./Cards";
import Pagination from "./Pagination";

const Home = () => {

  // Declare Constants
  const navigate = useNavigate();
  const [strSearch, setStrSearch] = useState("");
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [strSelect, setStrSelect] = useState("0")
  const url = "https://pokeapi.co/api/v2";

  //LOGICA DE PAGINACION
  const [page, setPage] = useState(1);
  const [pokePerPage, setPokePerPage] = useState(20);
  const initialPoke = (page - 1) * pokePerPage;
  const finalePoke = page * pokePerPage;
  //se pone && porque pokemon es undefinden
  const maxPage = data && data.length / pokePerPage;


  //function para obtener pokemones, de forma global como con nombre
  const getAllPokemons =  (str="all") => {
    setIsLoading(true);
    if (str === "all") {
      axios.get(`${url}/pokemon?offset=0&limit=1500`)
      .then(success => setData(success.data?.results))
      .catch(error => {
        alert(`Error en la carga de pokemones, volver a cargar la página`)
        getAllPokemons();
      }).finally(()=> setIsLoading(false))
      
    } else {
      
      axios.get(`${url}/pokemon/${str.toLowerCase()}`)
      .then(success => {
        setIsLoading(false) 
        navigate(`/pokemon/${success.data?.id}`)
      })
      .catch(error => {
        if(error.response.status === 404){
          alert(`No se encontró el pokemon ${str}`)
          setStrSearch("")
          getAllPokemons();
        } 
      }).finally(()=> setIsLoading(false))
    } 
  };

  //Obtener los tipos de pokemones para el select
  const getTypes =  () => {
    axios.get(`${url}/type`).then(success => setTypes(success.data?.results) )
    .catch(error => {
      if(error.response?.status === 404){
        alert(`No se pudo obtener los tipos de pokemones`)
        location.reload();
      } 
    })
  };

  //Obtener los pokemones por tipo
  const getTypePokemon = (type) => {
    setStrSelect(type)
    setIsLoading(true);
    if (type === "0") {
      getAllPokemons("all")
    }else{
      axios.get(`${url}/type/${type}`)
      .then(success => {
        const typesData = success.data?.pokemon.map(item => ({name: item.pokemon.name, url: item.pokemon.url })) 
        setData(typesData)
      }).catch(error => {
        if(error.response.status === 404){
          alert(`No se encontró el data para el tipo de pokemon seleccionado`)
          getAllPokemons();
        } 
      }).finally(() => setIsLoading(false))
    }
  };

  //se hace la peticion cuando carga el app
  useEffect(() => {
    getAllPokemons("all");
    getTypes();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Loader/>}
      {data.length > 0 && (
        <>
          <div className="container">
            <div className="main">
              <div className="main-content">
                <p>
                  <strong>Welcome Trainer,</strong> here are found your
                  favorites pokemon
                </p>
                <div className="main-search">
                  <div className="search-input">
                    <input
                      required
                      value={strSearch}
                      onChange={(e) => setStrSearch(e.target.value)}
                      type="text"
                      placeholder="Input.."
                    />
                    <button onClick={() => getAllPokemons(strSearch)}>
                      Search
                    </button>
                  </div>
                  <div className="search-select">
                    <select
                      name=""
                      id=""
                      value={strSelect}
                      onChange={(e) => getTypePokemon(e.target.value)}
                    >
                      <option value="0">All Pokemon</option>
                      {types.map((item) => +item.url.split("/")[6] < 1000 &&
                        <option key={item.name} value={item.url.split("/")[6]}>
                          {item.name}
                        </option>
                      )}
                    </select>
                  </div>
                </div>
               
                <div className="container-list">
                  {data.slice(initialPoke, finalePoke).map((item) => <Cards key={item.name} url={item.url} /> )}
                </div>
                {
                  <Pagination page={page} maxPage={maxPage} setPage={setPage} />
                }
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
