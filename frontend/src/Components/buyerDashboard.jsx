import { useEffect, useState } from 'react';
import '../styles/buyerDashboardStyle.css'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { allProducts, searchedProductByNameDetails } from '../../utils/backendAPI';
import EachProductTab from './EachProductTab';
import { buyerDetails } from '../../utils/buyerAPI';
import noBuyerProduct from '../Images/noBuyerProduct.jpg'
import { Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { CgSearch } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react'

function BuyerDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  // eslint-disable-next-line no-unused-vars
  const [productArray, setProductArray] = useState([])
  const [cookies, removeCookies] = useCookies(['user']);
  const [buyerDetailArray, setBuyerDetailArray] = useState([])
  const [searchValue, setSearchValue] = useState('')
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

    const gettingBuyerDetails = async() => {
      try{
        const data = await buyerDetails(user.buyerId)
        setBuyerDetailArray(data)
      }
      catch(err) {
        console.log(err)
      }
    }

    gettingBuyerDetails()
    getAllProducts()
  }, [user.buyerId, productArray])

  const searchingProductWithNameFunction = async() => {
    try{
      const searchedDataProductDetails = await searchedProductByNameDetails(searchValue)
      setProductArray(searchedDataProductDetails)
    }
    catch(err) {
      console.log(err)
    }
  }

  // Logout Function
  const handleLogout = () => {
    removeCookies('user');
    navigate('/');
  };

  const showingAllProducts = () => {

    if (productArray.length === 0) {
      return <img src={noBuyerProduct} alt="" className='emptyBuyerDashboard'/>;
    }

    return productArray.map((e) => (
      <EachProductTab productImg={e.productImg} productName={e.productName} productPrice={e.productPrice} key={e._id} productId={e._id} isBuyer={true} isCart={false}/>
    ))
  }

  return (
    <>
      <div>
        <div className="buyertop">
          <p className="buyergreeting">Welcome, {buyerDetailArray.name}</p>
          <div className='searchContainer'>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <CgSearch />
                </InputLeftElement>
                <Input type='text' placeholder='Product Name' value={searchValue} onChange={e => setSearchValue(e.target.value)} width='600px'/>
              </InputGroup>
            </Stack>
            <Button colorScheme='teal' className='searchButton' onClick={searchingProductWithNameFunction}>Search</Button>
          </div>
          <div className="buyerbuttonContainer">
            <GiHamburgerMenu className='menuDrawer' onClick={onOpen} ref={btnRef}/>
            <div>
            <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>

                <DrawerBody>
                  <div className='drawerElement' onClick={() => navigate('/buyerDashboard')}>Home</div>
                  <div className='drawerElement' onClick={() => navigate('/cartPage')}>Cart</div>
                  <div className='drawerElement'>Chat</div>
                </DrawerBody>

                <DrawerFooter>
                  <div className='logOutButtonContainer'>
                    <Button onClick={handleLogout} colorScheme='red'>LogOut</Button>
                  </div>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            </div>
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
