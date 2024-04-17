import '../styles/productPageStyle.css'
import { Card, CardBody, Image, Text, Stack, Heading, CardFooter, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetails, deleteProduct } from '../../utils/backendAPI'
import { useNavigate } from 'react-router-dom'
import { removeProductid } from '../../utils/sellerAPI'

function SellerProductPage() {
    const { productId } = useParams()
    const navigate = useNavigate()
    const [details, setDetails] = useState([])
    const [sellerId, setSellerId] = useState('')

    useEffect(() => {
        const gettingDetails = async() => {
            try{
                const res = await getDetails(productId)
                await setDetails(res)
                await setSellerId(res.seller)
            }
            catch(err) {
                console.log(err)
            }
        }

        gettingDetails()
    }, [productId, details])

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
            await removeProductid(sellerId, productId)
            console.log('ProductId deleted')
        }
        catch(err) {
            console.log(err)
        }
    }

    const completeDeletion = () => {
        deleteingProductFunction()
        deletingProductIdFunction()
        navigate('/sellerDashboard')
    }

    return (
        <div className='container'>
            <div className='cardContainer'>
                <Card
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                >
                    <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '200px' }}
                    src={details.productImg}
                    alt='Caffe Latte'
                    margin="20px"
                    />
                    <Stack>
                        <CardBody>
                            <Heading size='md'>{details.productName}</Heading>
                            <Heading size='ms'>{details.productPrice}</Heading>
                            <Text py='2'>{details.productDescription}</Text>
                        </CardBody>

                        <CardFooter>
                            <Button variant='solid' colorScheme='red' onClick={() => completeDeletion()}>Delete</Button>
                        </CardFooter>
                    </Stack>
                </Card>
            </div>
        </div>
    )
}

export default SellerProductPage