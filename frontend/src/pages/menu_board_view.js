import React, {useEffect, useState} from 'react'
import "../css/full_menu.css"
import image from "../pictures/starbucks-logo-png-25.png"
import {useNavigate} from "react-router-dom";
import {wait} from "@testing-library/user-event/dist/utils";

function scrollDown() {
  window.scrollBy({top:2, behavior:"smooth"});
}
function scrollUp() {
  window.scrollBy({top:-1, behavior:"smooth"});
}

function autoscroll() {
  let downtimer = 0;
  let uptimer = 0;
  downtimer = setInterval(scrollDown, 60);
  setTimeout(
    function(){
      clearInterval(downtimer);
      }, 100000)
  setTimeout(
    function(){
      uptimer = setInterval(scrollUp, 60);
      }, 105000)
  setTimeout(function(){
      clearInterval(uptimer);
      }, 205000)
}

function MenuBoard() {

  const [weather, setWeather] = useState({'name': 'College Station', 'main': 'cloudy', 'temp': 83})
  // const [value, setValue] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:5000/weather/77840")
  //   .then(response => response.json())
  //   .then(result => setWeather(result))
  // }, [])
  const navigate = useNavigate();

  autoscroll();
  setInterval(autoscroll, 210000);

  return (
    <div>
      <div className='center'>
        <div className='starbucks-banner'>
          <div className="starbucks-logo" style={{ backgroundImage: `url(${image}` }}></div>
        </div>
        <div className='background'>
          <div className='center'>
            <div>

              <br></br>
              <h1>Menu Board</h1>
            </div>
            <div className='weather-time'>{weather.name} | {weather.main} | Temperature: {weather.temp}</div>
          </div>
          <div>
          <body>
            <div className='menu-items'>
              <h2>Hot and Iced Coffees:</h2>
              <p>Brewed Coffee</p>
              <p>Iced Coffee</p>
              <p>Cafe Latte</p>
              <p>Cold Brew Coffee</p>
              <p>Cold Brew with Cold Foam</p>
              <p>Salted Caramel Cold Brew</p>
              <br></br>
              <h2>Espresso Drinks:</h2>
              <p>Americano</p>
              <p>Cappuccino</p>
              <p>Caffe Latte</p>
              <p>Caramel Macchiato</p>
              <p>Cafe Mocha</p>
              <p>White Chocolate Mocha</p>
              <p>Cinnamon Dolce Latte</p>
              <p>Toffee Nut Latte</p>
              <p>Coconut Macchiato</p>
              <p>Cinnamon Dolce Almond Milk Macchiato</p>
              <p>Coconut Mocha</p>
              <p>Black and White Mocha</p>
              <p>Iced Americano</p>
              <br></br>
              <h2>Frappuccinos:</h2>
              <p>Coffee Frappuccino</p>
              <p>Espresso Frappuccino</p>
              <p>Mocha Frappuccino</p>
              <p>Caramel Frappuccino</p>
              <p>Strawberry Creme Frappuccino</p>
              <p>Vanilla Bean Frappuccino</p>
              <p>Java Chip Frappuccino</p>
              <p>Double Chocolatey Chip Frappuccino</p>
              <p>White Chocolate Mocha Frappuccino</p>
              <p>Blueberry Smoothie</p>
              <p>Pomegranate Smoothie</p>
              <p>Mango Smoothie</p>
              <p>Matcha Creme Frappuccino</p>
              <br></br>
              <h2>Teas:</h2>
              <p>Hot Tea</p>
              <p>Brewed Tea</p>
              <p>Green Tea</p>
              <p>Ho Chi Minh Tea</p>
              <p>Iced Tea Lemonade</p>
              <p>Tazo Chai Tea</p>
              <p>Pink Drink</p>
              <p>Strawberry Acai Lemonade Refresher</p>
              <p>Strawberry Acai Refresher</p>
              <p>Dragon Drink</p>
              <p>Mango Dragonfruit Lemonade Refresher</p>
              <p>Mango Dragonfruit Refresher</p>
              <p>Very Berry Hibiscus Refresher</p>
              <p>Tavalon Black Tea</p>
              <p>Tavalon Green Tea</p>
              <br></br>
              <h2>Bakery Snacks:</h2>
              <p>Everything Bagel</p>
              <p>Multi-Grain Bagel</p>
              <p>Plain Bagel</p>
              <p>Cream Cheese</p>
              <p>Glazed Donut</p>
              <p>Cheese Danish</p>
              <p>Apple Fritter</p>
              <p>Salted Caramel Cookie</p>
              <p>Cinnamon Roll</p>
              <p>Blueberry Muffin</p>
              <p>Tuxedo Muffin</p>
              <p>Banana Muffin</p>
              <p>Banana Nut Loaf</p>
              <p>Sweet Croissant</p>
              <p>Sweet Chocolate Chip Cookie</p>
              <p>Baked Chocolate Chip Cookie</p>
              <p>Toffee Bar</p>
              <p>Chocolate Chip Cookie</p>
              <p>Brownie Bar</p>
              <p>Zeo's Cookie</p>
              <p>Cheesecake</p>
              <br></br>
              <h2>Other Drinks:</h2>
              <p>Cold Milk</p>
              <p>Hot Chocolate</p>
              <p>White Hot Chocolate</p>
              <p>Soda</p>
              <p>Steamed Milk</p>
            </div>
            <div className='menu-prices'>
              <h2>Grande Price:</h2>
              <p>$2.95</p>
              <p>$3.95</p>
              <p>$4.65</p>
              <p>$4.45</p>
              <p>$4.45</p>
              <p>$5.25</p>
              <br></br>
              <h2>Grande Price:</h2>
              <p>$3.65</p>
              <p>$4.65</p>
              <p>$4.65</p>
              <p>$5.45</p>
              <p>$5.25</p>
              <p>$5.25</p>
              <p>$5.65</p>
              <p>$5.45</p>
              <p>$5.25</p>
              <p>$5.25</p>
              <p>$5.65</p>
              <p>$5.45</p>
              <p>$5.65</p>
              <br></br>
              <h2>Grande Price:</h2>
              <p>$5.45</p>
              <p>$6.45</p>
              <p>$5.65</p>
              <p>$5.65</p>
              <p>$5.65</p>
              <p>$5.45</p>
              <p>$5.65</p>
              <p>$5.65</p>
              <p>$5.65</p>
              <p>$5.65</p>
              <p>$5.65</p>
              <p>$5.65</p>
              <p>$5.65</p>
              <br></br>
              <h2>Grande Price:</h2>
              <p>$3.25</p>
              <p>$3.25</p>
              <p>$3.25</p>
              <p>$3.95</p>
              <p>$3.25</p>
              <p>$4.95</p>
              <p>$4.95</p>
              <p>$4.95</p>
              <p>$4.45</p>
              <p>$4.95</p>
              <p>$4.95</p>
              <p>$4.45</p>
              <p>$4.45</p>
              <p>$3.25</p>
              <p>$3.25</p>
              <br></br>
              <h2>Price:</h2>
              <p>$2.25</p>
              <p>$2.25</p>
              <p>$2.25</p>
              <p>$0.95</p>
              <p>$2.25</p>
              <p>$3.45</p>
              <p>$3.45</p>
              <p>$2.95</p>
              <p>$3.75</p>
              <p>$3.25</p>
              <p>$3.25</p>
              <p>$3.25</p>
              <p>$3.65</p>
              <p>$3.45</p>
              <p>$2.95</p>
              <p>$2.95</p>
              <p>$3.25</p>
              <p>$2.95</p>
              <p>$3.25</p>
              <p>$2.95</p>
              <p>$3.25</p>
              <br></br>
              <h2>Grande Price:</h2>
              <p>$3.25</p>
              <p>$3.95</p>
              <p>$3.95</p>
              <p>$3.25</p>
              <p>$2.95</p>
            </div>
          </body>
          </div>
        </div>
        <div className='center'>
              <div className='back' onClick={() => navigate("/")}>Back</div>
        </div>
      </div>
    </div>
  )
}

export default MenuBoard