import pichachu from '../../public/assets/img/pokemon-triste.png'
const NotFound = () => {  
  return (
    <div className="not-found">
      <img src={pichachu} alt="" />
      <p>404 Page Not Found</p>
    </div>
  )
}

export default NotFound