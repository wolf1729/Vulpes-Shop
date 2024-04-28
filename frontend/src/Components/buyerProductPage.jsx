import '../styles/productPageStyle.css';
import { Card, CardBody, Image, Text, Stack, Heading, CardFooter, Button, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetails } from '../../utils/backendAPI';
import { addProductToCart } from '../../utils/buyerAPI';
import { useCookies } from 'react-cookie';
import { gettingBasicSellerDetails } from '../../utils/sellerAPI';

function BuyerProductPage() {
    const toast = useToast()
    const [cookies] = useCookies(['user']);
    const user = cookies.user;
    const { productId } = useParams();
    const [details, setDetails] = useState({});
    const [sellerId, setSellerId] = useState('');
    const [sellerDetails, setSellerDetails] = useState({});

    useEffect(() => {
        const gettingDetails = async () => {
            try {
                const res = await getDetails(productId);
                setDetails(res);
                setSellerId(res.seller);
            } catch (err) {
                console.log(err);
            }
        };

        gettingDetails();
    }, [productId]);

    useEffect(() => {
        const gettingSellerDetails = async () => {
            try {
                const data = await gettingBasicSellerDetails(sellerId);
                setSellerDetails(data);
            } catch (err) {
                console.log(err);
            }
        };

        if (sellerId) {
            gettingSellerDetails();
        }
    }, [sellerId]);

    const addProductToCartFunction = async () => {
        try {
            await addProductToCart(user.buyerId, productId);
            toast({
                title: 'Product Added to Cart',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='container'>
            <div className='cardContainer'>
                <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                        src={details.productImg}
                        alt={details.productName}
                        margin='20px'
                    />
                    <Stack>
                        <CardBody>
                            <Heading size='md'>{details.productName}</Heading>
                            <Heading size='ms'>{details.productPrice}</Heading>
                            <Text py='2'>{details.productDescription}</Text>
                            <Text size='md'>Name: {sellerDetails.name}</Text>
                            <Text size='md'>Phone Number: {sellerDetails.phone}</Text>
                        </CardBody>

                        <CardFooter>
                            <Button variant='solid' colorScheme='blue'>
                                Chat
                            </Button>
                            <Button variant='solid' colorScheme='green' marginLeft='10px' onClick={addProductToCartFunction}>
                                Add To Cart
                            </Button>
                        </CardFooter>
                    </Stack>
                </Card>
            </div>
        </div>
    );
}

export default BuyerProductPage;
