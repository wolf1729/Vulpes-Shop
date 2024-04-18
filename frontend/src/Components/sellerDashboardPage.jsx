import '../styles/sellerDashboardStyle.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AddProductModal from './addProductModal';
import { getSellerProductsAPI } from '../../utils/backendAPI';
import EachProductTab from '../Components/EachProductTab';
import { sellerDetailsAfterLogin } from '../../utils/sellerAPI';
import { Spinner, Stack } from '@chakra-ui/react'

function SellerDashboardPage() {
  const [cookies, removeCookies] = useCookies(['user']);
  const user = cookies.user;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sellerDetails, setSellerDetails] = useState([]);
  const [sellerProductDetails, setSellerProductDetails] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  
  useEffect(() => {
    const sellerProductList = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const sellerId = user.sellerId;
        const seller = await sellerDetailsAfterLogin(sellerId);
        setSellerDetails(seller);
        
        const productIds = seller.product;
        const productDetailsArray = [];

        for (const productId of productIds) {
          const details = await getSellerProductsAPI(productId);
          productDetailsArray.push(details);
        }

        setSellerProductDetails(productDetailsArray);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    sellerProductList();
  }); // Add user to dependency array
  
  const showingSellerProducts = () => {
    if (sellerProductDetails.length === 0) {
      return <p>No Product Uploaded</p>;
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
      <div>
        <div className="top">
          <p className="greeting">Welcome, {sellerDetails.name}</p>
          <div className="sellerbuttonContainer">
            <button className="addProductButton" onClick={openModal}>Add Product</button>
            <AddProductModal isOpen={modalIsOpen} onRequestClose={closeModal} />
            <button className="logoutButton" onClick={handleLogout}>LogOut</button>
          </div>
        </div>
        <div className='sellerProductContainer'>
          {/* Render the loading spinner while loading */}
          {loading ? (
            <Stack direction='row' spacing={4}>
              <Spinner size='xl' />
            </Stack>
          ) : (
            showingSellerProducts()
          )}
        </div>
      </div>
    </>
  );
}

export default SellerDashboardPage;
