import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css'; // Tự thêm CSS để chia layout grid

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  
  // Lấy danh sách item trong giỏ hàng từ Redux để check nút disable và tính tổng số lượng icon
  const cartItems = useSelector(state => state.cart.items);
  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=300", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c5541e70ad39?w=300", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=300", cost: "$14" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1525498122346-362221764651?w=300", cost: "$22" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=300", cost: "$10" }
      ]
    },
    {
      category: "Aromatic",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=300", cost: "$20" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e2?w=300", cost: "$15" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=300", cost: "$8" },
        { name: "Basil", image: "https://images.unsplash.com/photo-1519897831810-a9a01aceccd1?w=300", cost: "$9" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1508717272800-9fff97da7e8f?w=300", cost: "$25" },
        { name: "Thyme", image: "https://images.unsplash.com/photo-1559800727-86f376a953e1?w=300", cost: "$11" }
      ]
    },
    {
      category: "Low Maintenance",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632245889029-e406faaa34cd?w=300", cost: "$25" },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=300", cost: "$14" },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=300", cost: "$30" },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1597055181300-e3633a207518?w=300", cost: "$15" },
        { name: "Succulent Mix", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300", cost: "$12" },
        { name: "Chinese Evergreen", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300", cost: "$19" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  // Hàm kiểm tra xem cây đã được thêm vào giỏ hàng chưa để disable nút
  const isPlantInCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      {/* Navbar xuất hiện ở cả trang Product và Cart */}
      <nav className="navbar">
        <div className="nav-logo" onClick={() => window.location.reload()}>Paradise Nursery</div>
        <div className="nav-links">
          <a href="#" onClick={() => setShowCart(false)}>Plants</a>
          <div className="cart-icon-container" onClick={() => setShowCart(true)}>
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{totalCartCount}</span>
          </div>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-listing">
          {plantsArray.map((categoryGroup, index) => (
            <div key={index} className="category-section">
              <h2 className="category-title">{categoryGroup.category}</h2>
              <div className="products-grid">
                {categoryGroup.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="product-card">
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3>{plant.name}</h3>
                    <p className="product-cost">{plant.cost}</p>
                    <button 
                      className="add-to-cart-btn"
                      disabled={isPlantInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isPlantInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
