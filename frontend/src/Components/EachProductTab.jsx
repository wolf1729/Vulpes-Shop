import '../styles/eachProductContainer.css'
import { useCookies } from 'react-cookie';
import { addProductToCart, removeProductFromCart } from '../../utils/buyerAPI';
import { deleteProduct } from '../../utils/backendAPI';
import { removeProductid } from '../../utils/sellerAPI';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function EachProductTab({ productName, productPrice, productImg, productId, isBuyer=true, isCart=false }) {
    const navigate = useNavigate()
    const [cookies] = useCookies(['user']);
    const user = cookies.user

    const addProductToCartFunction = async () => {
        try {
            await addProductToCart(user.buyerId, productId);
            console.log('Product added to Cart');
        } catch (err) {
            console.log(err);
        }
    }

    const deletingProductFromCart = async() => {
        try{
            await removeProductFromCart(user.buyerId, productId)
            console.log('Product deleted from Cart')
        }
        catch(err) {
            console.log(err)
        }
    }

    const deleteingProductFunction = async() => {
        try{
            await deleteProduct(productId)
            console.log('Item deleted')
        }
        catch(err) {
            console.log(err)
        }
    }

    const deletingProductIdFunction = async() => {
        try{
            await removeProductid(user.sellerId, productId)
            console.log('ProductId deleted')
        }
        catch(err) {
            console.log(err)
        }
    }

    const completeDeletion = () => {
        deleteingProductFunction()
        deletingProductIdFunction()
    }

    const navigationFunction = (e) => {
        navigate(e)
    }

    const buttonDisplayFunction = () => {
        if (isBuyer === true && isCart === false){
            return (
                <>
                    <button className='detailsButton' onClick={() => navigationFunction(`/buyerProductPage/${productId}`)}>Details</button>
                    <button className='cartButton' onClick={addProductToCartFunction}>Add To Cart</button>
                </>
            )
        }
        else if(isBuyer === true && isCart === true){
            return (
                <>
                    <button className='detailsButton' onClick={() => navigationFunction(`/buyerProductPage/${productId}`)}>Details</button>
                    <button className='cartRemoveButton' onClick={() => deletingProductFromCart()}>Remove From Cart</button>
                </>
            )
        }
        else{
            return ( 
                <>
                    <button className='detailsButton' onClick={() => navigationFunction(`/sellerProductPage/${productId}`)}>Details</button>
                    <button className='deleteButton' onClick={() => completeDeletion()}>Delete</button>
                </>
            )
        }
    }

    return (
        <div className='productCont'>
            <img src={productImg} alt="Image" className='productImgContainer'/>
            <div className='detailsContainer'>
                <p className='name'>{productName}</p>
                <p className='price'>{`<${productPrice}>`}</p>
            </div>
            <div className='buttonContainer'>
                {
                    buttonDisplayFunction()
                }
            </div>
        </div>
    );
}

export default EachProductTab;
