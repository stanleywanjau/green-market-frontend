import React from 'react'
import { useCart } from 'react-use-cart';
import { useNavigate } from 'react-router-dom';


const Home = ({products}) => {
  const { addItem, removeItem, inCart } = useCart();
  const navigate = useNavigate();

  function navigateToProductDetails(productId) {
        navigate(`/product/${productId}`); 
      }
    

  const handleClick = (product) => {
    if (inCart(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };
  return (
    <>
      {products.map((product) => (

    <div className="card" >
  <img src={product.image} class="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{product.name}</h5>
    <p class="card-text">{product.price}</p>
    <a href="#" class="btn btn-primary" onClick={()=>navigateToProductDetails(product.id)}>View details</a>
    <a href="#" class="btn btn-primary">Add to Cart</a>

  </div>
</div>))}

    </>
    
    
   
  )
}

export default Home