import plate from "./Plates.json"
import FoodItems from "./Components/FoodItems"
import { useState } from "react"

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [confirmCartItems, setConfirmCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  

const addToCart = (item) => {
  const existingItemIndex = cartItems.findIndex((cartItems) => cartItems.id === item.id);

  // Calculate total price for this item
  const fixPrice = parseFloat(item.price.replace("$", ""));
  const totalPriceOfEachItem = fixPrice * item.quantity;
  const itemWithTotal = { ...item, totalPriceOfEachItem };

  if (existingItemIndex !== -1) {
    const updatedCartItems = [...cartItems];
    updatedCartItems[existingItemIndex] = itemWithTotal;
    setCartItems(updatedCartItems);
  } else {
    setCartItems([...cartItems, itemWithTotal]);
  }
  
};

// remove item from cart
const removeCartItem = (itemId) => {
  setCartItems(cartItems.filter(item => item.id !== itemId));
  
}

// Calculate total price of all items in cart
// const totalPrice = cartItems.reduce((total, item) => {
//   const priceValue = parseFloat(item.priceValue.replace('$', '').replace('@', ''));
//   return total + (priceValue * item.quantity);
// }, 0);
// console.log('Total Price:', totalPrice);

const totalPriceOfAllItems = cartItems.reduce((total, item) => {
  return total + item.totalPriceOfEachItem;
}, 0);

const showConfirmCart = () =>  {
  setConfirmCartItems([...cartItems]);
  !showCart ? setShowCart(true) : setShowCart(false);
};

const addMoreCart = () =>  {
  // setCartItems([]);
  setConfirmCartItems([]);
  showCart ? setShowCart(false) : setShowCart(true);
};


  return (
    <>
    
    <div className="flex flex-col bg-pink-50 z-0 relative md:flex-row">
      <div className={`${showCart ? "flex" : "hidden"} absolute z-10 inset-0 bg-black opacity-50 w-full md:w-full h-6/6`}></div>
     <div className="ml-3 mr-3 md:ml-12 flex-2">
        <h1 className="mb-6 mt-12 font-bold text-4xl text-blue-950">Desserts</h1>
        <div className="foodPlate food grid grid-cols-1 gap-4 mb-12 md:grid-cols-3">
          {/*  */}

          {plate.plates.map((item) => {
            const cartItem = cartItems.find((ci) => ci.id === item.id);
            return (
              <FoodItems 
                key={item.id} 
                item={item} 
                addToCart={addToCart} 
                isInCart={Boolean(cartItem)}
                initialQuantity={cartItem?.quantity || 1}
              />
            );
          })}
          
        </div>
      </div>
      {/* <!-- left side end --> */}
      
        <div className="mt-6 ml-3 mr-3 md:mr-9 flex-1 ">
        <div className=" bg-white rounded-2xl p-6  mb-6">
          {/* <!--  --> */}
          <h2 className="number-of-items font-bold text-2xl text-red-600 mb-4">Your Cart ({cartItems.length})</h2>

          <div className={`${cartItems.length  <= 0 ? "flex" : "hidden"} flex-col justify-center items-center gap-6`}>
            <img src="/images/illustration-empty-cart.svg" alt="" />
            <p className="text-yellow-950 font-bold">Your added items will appear here</p>
          </div>
          <div className="overflow-auto h-[300px]">
           {cartItems.map((item, index) => (
          <div className="parent-cart" key={index}>
           
            <h3 className="mb-2">{item.subtitle}</h3>
            <div className="relative flex items-center">
              <span className="text-red-600 font-bold">{item.quantity}x</span>
              <span className="mx-4 text-gray-300 font-bold">@ {item.price}</span>
              <span className="font-bold text-gray-400">${item.totalPriceOfEachItem.toFixed(2)}</span>
              <div
                className="absolute right-0 bottom-6 border-2 border-gray-300 p-1 rounded-full"
              >
                <img src="../public/images/icon-remove-item.svg" alt="" onClick={() => removeCartItem(item.id)}/>
              </div>
            </div>
             <hr className="w-full h-1 text-gray-400 my-6" />
            {/* <!--  --> */}

          </div>
         
            ))}
            
            </div>

          {/* <!-- The Cart Items total --> */}
          <div className={`${cartItems.length  <= 0 ? "hidden" : "flex"} totalOrder justify-between items-center mb-4`}>
            <p className="text-[12px] text-gray-400">Order Total</p>
            <h1 className="font-bold">${totalPriceOfAllItems.toFixed(2)}</h1>
          </div>
          {/* <!-- The icon --> */}
          <div
            className={`${cartItems.length  <= 0 ? "hidden" : "flex"} flex justify-center items-center gap-2 bg-amber-50 p-3 rounded-2xl`}
          >
            <img src="../public/images/icon-carbon-neutral.svg" alt="" />
            <p>This is <b>carbon neutral</b> delivery</p>
          </div>
           {/* confirmation */}
           <div className={`${cartItems.length  <= 0 ? "hidden" : "flex"} mt-6`}>
            <button
              className="w-full bg-red-700 text-white font-bold py-3 rounded-full"
           onClick={showConfirmCart} >
              Confirm Order
            </button>
        </div>
        {/*  */}
      </div>
    </div>
    </div>
    {/* confirm cart */}
    <div className={`${showCart ? "flex" : "hidden"} absolute flex flex-col bg-white rounded-2xl p-3 w-full h-screen md:w-1/2 top-[100px] left-0  md:left-[300px] `}>
      <img src="../public/images/icon-order-confirmed.svg" alt="" className="mb-3 w-[50px]"/>
      <div className="mb-6">
        <h1 className="text-2xl md:text-4xl font-bold mb-3 ">Order Confirmed</h1>
        <span className="text-gray-400">We hope you enjoy your food!</span>
      </div>
      {/* confirm cart details*/}
      <div className="relative overflow-auto h-[300px] bg-pink-50 rounded-2xl p-3 ">
        {confirmCartItems.map((item, index) => {
          return (
            <div className="" key={index}>
          <div className="flex gap-6 mb-4" >
            <img src={item.image} alt="" className="w-[70px] h-[70px] rounded-1xl"/>
            <div className="flex flex-col gap-3 ">
              <h4>{item.subtitle}</h4>
              <div>
              <span className="text-red-600 font-bold">{item.quantity}x</span>
              <span className="mx-4 text-gray-300 font-bold">@ {item.price}</span>
              <span className="absolute right-6 font-bold">${item.totalPriceOfEachItem.toFixed(2)}</span>
              </div>
              </div>
              
          </div>
          <hr className="w-full h-1 text-gray-400 my-2" />
          </div>
        );
        })}
      
        
      </div>
      {/*   Order confirm total */}

      <div className="flex justify-between items-center mt-3 mb-3">
            <p className=" text-gray-400">Order Total</p>
            <h1 className="text-2xl font-bold">${totalPriceOfAllItems.toFixed(2)}</h1>
          </div>
      {/*  */}
      <div className="mt-9">
            <button
              className="w-full  bg-red-700 text-white font-bold py-3 rounded-full"
           onClick={addMoreCart} >
              Start New Order
            </button>
        </div>
    </div>
    </>
  )
}

export default App

