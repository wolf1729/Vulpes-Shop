import '../styles/sellerDashboardStyle.css';
import emptySellerProduct from '../Images/emptySeller.jpg'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddProductModal from './addProductModal';
import { getSellerProductsAPI } from '../../utils/backendAPI';
import EachProductTab from '../Components/EachProductTab';
import { sellerDetailsAfterLogin } from '../../utils/sellerAPI';


function SellerDashboardPage() {
  const [cookies, removeCookies] = useCookies(['user']);
  const user = cookies.user;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [sellerDetails, setSellerDetails] = useState([])
  const [sellerProductDetails, setSellerProductDetails] = useState([]);
  const navigate = useNavigate();
  console.log(user);
  
  useEffect(() => {
    const sellerProductList = async () => {
      try {
        const sellerId = user.sellerId;
        const seller = await sellerDetailsAfterLogin(sellerId)
        setSellerDetails(seller)

        const productIds = seller.product
        const productDetailsArray = [];

        for (const productId of productIds) {
          const details = await getSellerProductsAPI(productId);
          productDetailsArray.push(details);
        }

        setSellerProductDetails(productDetailsArray);
      } catch (err) {
        console.log(err);
      }
    };

    sellerProductList();
  }, [user.sellerId]); 

  // Function to render seller products
  const showingSellerProducts = () => {
    if (sellerProductDetails.length === 0) {
      return <img src={emptySellerProduct} alt="" className='emptySellerImage'/>;
    }

    return sellerProductDetails.map((item) => (
      <EachProductTab
        key={item._id}
        productName={item.productName}
        productImg={item.productImg}
        productPrice={item.productPrice}
        productId={item._id}
        isBuyer={false}
      />
    ));
  };

  // Logout Function
  const handleLogout = () => {
    removeCookies('user');
    navigate('/');
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => { 
    setModalIsOpen(false);
  };

  return (
    <>
      <div className='sellerDashboardMainContainer'>
        <div className="top">
          <p className="greeting">Welcome, {sellerDetails.name}</p>
          <div className="sellerbuttonContainer">
            <button className="addProductButton" onClick={openModal}>Add Product</button>
            <AddProductModal isOpen={modalIsOpen} onRequestClose={closeModal} />
            <button className="logoutButton" onClick={handleLogout}>LogOut</button>
          </div>
        </div>
        <div className='sellerProductContainer'>
          {showingSellerProducts()}
        </div>
      </div>
    </>
  );
}

export default SellerDashboardPage;
