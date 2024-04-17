import { useEffect, useState } from 'react';
import '../styles/buyerDashboardStyle.css'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { allProducts } from '../../utils/backendAPI';
import EachProductTab from './EachProductTab';

//THINGS TO ADD TO SELLER DASHBOARD: logout, showing all products, adding a product to cart

function BuyerDashboard() {
  // eslint-disable-next-line no-unused-vars
  const [productArray, setProductArray] = useState([])
  const [cookies, removeCookies] = useCookies(['user']);
  const user = cookies.user;
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    const getAllProducts = async() => {
      try{
        const res = await allProducts()
        await setProductArray(res)
        console.log(`in productArray ${productArray}`)
        console.log(res)
      }
      catch(err) {
        console.log(err)
      }
    }

    getAllProducts()
  }, [])

  // Logout Function
  const handleLogout = () => {
    removeCookies('user');
    navigate('/');
  };

  const showingAllProducts = () => {
    return productArray.map((e) => (
      <EachProductTab productImg={e.productImg} productName={e.productName} productPrice={e.productPrice} key={e._id} productId={e._id} isBuyer={true} isCart={false}/>
    ))
  }

  return (
    <>
      <div>
        <div className="buyertop">
          <p className="buyergreeting">Welcome, {user.buyerId}</p>
          <div className="buyerbuttonContainer">
            <button className='buyercartButton' onClick={() => navigate('/cartPage')}>Cart</button>
            <button className="buyerlogoutButton" onClick={handleLogout}>LogOut</button>
          </div>
        </div>
        <div className='buyerProductContainer'>
          {showingAllProducts()}
        </div>
      </div>
    </>
  );
}

export default BuyerDashboard;
