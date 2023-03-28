import React, { useState } from 'react';
import './App.css';
import CandyForm from './components/addingform/CandyForm';
import CandyList from './components/shop/CandyList';
import CartButton from './components/cart/CartButton';
import Cart from './components/cart/Cart';

function App() {
  const [showCart, setShowCart] = useState(false);

  const openCart_handler = () => {
    setShowCart(true);
  }

  const closeCart_handler = () => {
    setShowCart(false);
  }

  return (
    <React.Fragment>
      <CartButton onClick={openCart_handler} />
      {showCart && <Cart onClick={closeCart_handler} />}
      <CandyForm />
      <CandyList />
    </React.Fragment>
  );
}

export default App;
