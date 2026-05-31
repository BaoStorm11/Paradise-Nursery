import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Hàm chuyển đổi string "$15" thành số 15 để tính toán
  const parseCost = (costString) => {
    return parseFloat(costString.replace('$', ''));
  };

  // Tính tổng số tiền của toàn bộ giỏ hàng
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseCost(item.cost) * item.quantity);
    }, 0);
  };

  // Tính tổng tiền cho từng loại cây (Giá đơn vị * số lượng)
  const calculateTotalCost = (item) => {
    return parseCost(item.cost) * item.quantity;
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  const handleCheckout = () => {
    alert("Coming Soon! Thank you for your patience.");
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <h3 className="total-amount">Total Cart Amount: ${calculateTotalAmount()}</h3>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items-list">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item-card">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Unit Price: {item.cost}</p>
                <p>Subtotal: ${calculateTotalCost(item)}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>
                <button className="delete-btn" onClick={() => handleRemove(item.name)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-buttons">
        <button className="continue-shopping-btn" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
