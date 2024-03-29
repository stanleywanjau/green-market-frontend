import React, { useState } from "react";
import { useCart } from "react-use-cart";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = async (productId, quantity) => {
    const orderData = {
      product_id: productId,
      quantity_ordered: quantity
    };
    
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('jwt');
    if (!isAuthenticated) {
      // Redirect to signup/login page
      navigate('/signup');
      return;
    }

    try {
      const response = await fetch('https://green-market-backend-2es1.onrender.com/placeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        // Order placed successfully
        setOrderPlaced(true);
        toast.success('Order placed successfully');
      } else {
        // Handle error case
        toast.error('Failed to place order');
      }
    } catch (error) {
      toast.error('Error placing order:', error);
    }
  };

  function navigateHome() {
    navigate(`/`); 
  }

  if (isEmpty) return <h1>Your Cart is Empty</h1>;

  return (
    <div className="cart-section">
      <div>
        <h5>Cart ({totalUniqueItems}) total Items</h5>
        <table>
          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img className="cart-image" src={item.image} alt={item.title} style={{ height: '7rem', width: "7rem" }} />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <p>{item.price.toLocaleString('en-US', { style: 'currency', currency: 'KSH' })}</p>
                  </td>
                  <td>Quantity ({item.quantity})</td>
                  <td>
                    <button className="btn btn-outline-danger m-2" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                    <button className="btn btn-outline-success m-2" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                    <button className="btn btn-success m-2" onClick={() => removeItem(item.id)}>Remove Item</button>
                    <button className="btn btn-success m-2" onClick={() => handlePlaceOrder(item.id, item.quantity)}>Place Order</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {cartTotal && (
        <div>
          <h2>Total Price: {cartTotal.toLocaleString('en-US', { style: 'currency', currency: 'KSH' })}</h2>
        </div>
      )}
      <div className="cart-below">
        <button className="btn btn-success m-2" onClick={() => window.confirm("Are you sure you want to clear the cart?") && emptyCart()}>Clear Cart</button>
        <button className="btn btn-outline-secondary m-2" onClick={navigateHome}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default Cart;
