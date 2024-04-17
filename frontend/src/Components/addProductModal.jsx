/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from 'react-modal';
import { addProductAPI } from '../../utils/backendAPI';
import { addProductId } from '../../utils/sellerAPI';
import { useCookies } from 'react-cookie';
import { uploadFileInStorage } from '../../utils/firebase';

// eslint-disable-next-line no-unused-vars
const AddProductModal = ({ isOpen, onRequestClose }) => {
  const [cookies] = useCookies(['user']);
  const user = cookies.user;
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [selectedFile, setSelectedFile] = useState('')
  const [productId, setProductID] = useState('')
  const [productDes, setProductDes] = useState('')

  //Function to add the product to the database and then add its id to the seller data 
  const handleSubmit = async() => {
    try{
      const downloadURL = await uploadFileInStorage(selectedFile, productName)
      const res = await addProductAPI(productName, productPrice, downloadURL, productDes, user.sellerId)
      setProductID(res)
      console.log(productId)
      console.log(user.username)
      await addProductId( user.sellerId, res)
      console.log('Product added to the seller Database')
    }
    catch(err) {
      console.log(err)
    }
    
    onRequestClose()
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log('Selected file:', file);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Form Modal"
    >
      <form onSubmit={e=> e.preventDefault()}>
        <input type="text" placeholder='name of the product' value={productName} onChange={(e) => setProductName(e.target.value)}/>
        <br />
        <input type="text" placeholder='price of the product' value={productPrice} onChange={(e) => setProductPrice(e.target.value)}/>
        <br />
        <input type="text" placeholder='description of the product' value={productDes} onChange={(e) => setProductDes(e.target.value)}/>
        <br />
        <input type="file" id="imageInput" name="image" accept="image/*" onChange={handleFileChange} />
        <br />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </Modal>
  );
};

export default AddProductModal