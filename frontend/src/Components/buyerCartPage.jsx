import { useCookies } from "react-cookie";
import { buyerDetails } from "../../utils/buyerAPI";
import { useState, useEffect } from "react";
import EachProductTab from "./EachProductTab";
import { getBuyerProductsAPI } from "../../utils/backendAPI";
import { useNavigate } from "react-router-dom";
import emptyCart from '../Images/noCartProduct.jpg'

function BuyerCartPage() {
    const [cookies, removeCookies] = useCookies(['user']);
    const user = cookies.user;
    const navigate = useNavigate()
    // eslint-disable-next-line no-unused-vars
    const [buyerInfo, setBuyerInfo] = useState([])
    const [cartProductDetails, setCartProductDetails] = useState([])

    useEffect(() => {
        const buyerCartList = async () => {
          try {
            const buyerId = user.buyerId;
            const buyer = await buyerDetails(buyerId)
            setBuyerInfo(buyer)

            const buyerCartProductIds = buyer.cart
            const cartProductDetailsArray = []

            for (const productId of buyerCartProductIds) {
              const details = await getBuyerProductsAPI(productId);
              cartProductDetailsArray.push(details);
            }

            setCartProductDetails(cartProductDetailsArray)
          } 
          catch (err) {
            console.log(err);
          }
        };
    
        buyerCartList();
    }); 
    

    // Logout Function
    const handleLogout = () => {
        removeCookies('user');
        navigate('/');
    };

    const showingAllCartProducts = () => {
      if (cartProductDetails.length === 0) {
          return <img src={emptyCart} alt="" className="emptyCart"/>
      }
      
      return cartProductDetails
      .filter(product => product !== null && product !== undefined)
      .map((e) => (
      <EachProductTab
      productImg={e.productImg}
      productName={e.productName}
      productPrice={e.productPrice}
      key={e._id}
      productId={e._id}
      isBuyer={true}
      isCart={true}
      />
    ));
  };
  

    return (
        <>
        <div>
            <div className="buyertop">
                <p className="buyergreeting">Welcome, {buyerInfo.name}</p>
                <div className="buyerbuttonContainer">
                    <button className="buyerlogoutButton" onClick={handleLogout}>LogOut</button>
                </div>
            </div>
            <div className='buyerProductContainer'>
            {showingAllCartProducts()}
            </div>
      </div>
        </>
    )
}

export default BuyerCartPage