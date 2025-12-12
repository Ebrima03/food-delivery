import { useState } from "react"

const FoodItems = ({item, addToCart, isInCart = false, initialQuantity = 1}) => {

     const [defaultBtn, setDefaultBtn] = useState(!isInCart);
  const [counter, setCounter] = useState(isInCart ? initialQuantity : 1);

  // When isInCart changes, update the button and counter
  if (!isInCart && !defaultBtn) {
    setDefaultBtn(true);
    setCounter(1);
  }

  // function to  increment and decrement counter
    const increment = () => {
      setCounter(counter + 1);
      addToCart({...item, quantity:Number(counter + 1) });
    }

    const decrement = () => {
      counter > 1 && setCounter(counter - 1);
        counter > 1 && addToCart({...item, quantity: Number(counter - 1)});
       
    }

  // function to change button
const changeButton = () => {
    !defaultBtn ? setDefaultBtn(true) : setDefaultBtn(false);
     addToCart({...item, quantity: Number(counter)});
  }


  return (        
           <div className="relative">


            <img src={item.mobile} alt="" className={`md:hidden ${defaultBtn ? "" : "border-2 border-red-500"} rounded-2xl w-[400px]`}/>
                   <img
                     src={item.image}
                     alt=""
                     className={`hidden md:block ${defaultBtn ? "" : "border-2 border-red-500"} rounded-2xl`}
                   />
                   {/* <!-- The button defaultBtn--> */}
                   <button
                     className={`${defaultBtn ? "flex" : "hidden"} absolute items-center justify-center bottom-23 left-1/8 right-1/6 md:right-1/8 gap-2 border-2 border-gray-300 bg-white p-2 rounded-full`}
                   onClick={ changeButton }>
                     <img src="public/images/icon-add-to-cart.svg" alt="" />
                     <span>Add to Cart</span>
                   </button>
                   {/* <!-- the selectBtn --> */}
                   <button
                     className={`${!defaultBtn ? "flex" : "hidden"} absolute justify-between bottom-23 left-1/8 right-1/6 md:right-1/8 border border-gray-300 bg-red-700 py-2 px-3 rounded-full`}
                   >
                     <img
                       src="public/images/icon-decrement-quantity.svg"
                       alt=""
                       className="border-2 border-white rounded-full px-2 py-2"
                    onClick={decrement} />
                     <span className="counter text-white font-bold">{counter}</span>
                     <img
                       src="public/images/icon-increment-quantity.svg"
                       alt=""
                       className=" border-2 border-white rounded-full px-2 py-2"
                     onClick={increment}/>
                   </button>
                   {/* <!-- plate details --> */}
                   <div className="flex flex-col mt-9">
                     <p className="text-gray-500">{item.title}</p>
                     <h2 className="font-semibold text-lg text-blue-950">
                       {item.subtitle}
                     </h2>
                     <p className="font-bold text-red-900">{item.price}</p>
                   </div>
                 </div>
  )
}

export default FoodItems
