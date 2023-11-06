import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate,useParams } from 'react-router-dom';
function Home({ isLoggedIn }) {
  const navigate = useNavigate();
  if ( !isLoggedIn) {
    return (
      <div>
        <h1>Please Login </h1>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    )
  }
  const { itemId } = useParams();
  const [goods, setGoods] = useState([]);
  const [purchasedGoods, setPurchasedGoods] = useState([]);

  // Fetch the list of goods from the backend when the component mounts
  useEffect(() => {
    const token = Cookies.get('jwtToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('http://localhost:8000/resource/') // Replace with your actual API endpoint
      .then((response) => {
        setGoods(response.data);
      })
      .catch((error) => {
        console.error('Error fetching goods:', error);
      });
  }, [itemId]);

  const handlePurchase = (good) => {
    alert("You don't have enough balance");
  };
 

  return (
    <div>
      <h1>Goods for Sale</h1>
        {goods.map((good, index) => (
          <div key={index}>
            {good.itemName} - ${good.price}
            <button onClick={() => handlePurchase(good)}>Purchase</button>
          </div>
        ))}
      <button onClick={() => navigate('/create')}>Create Resources</button>
      <button>Update Resources</button>
      <button>Delete Resources</button>
    </div>
  );
}

export default Home;

