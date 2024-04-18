import '../styles/sellerLogin.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { newSellerSignUp } from '../../utils/sellerAPI'
import { useToast } from '@chakra-ui/react';

function SellerSignupPage() {
    const toast = useToast();
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const makeNewSellerUser = async() => {
        try{
            await newSellerSignUp(username, password, name, phone)

            toast({
                title: 'Seller account created successfully.',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });

            console.log('Seller created')
            navigationFunction('/sellerLogin')
        }
        catch(err) {
            console.log(err)
            toast({
                title: 'An error occurred during account creation. Please try again.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    }

    const navigationFunction = (page) => {
        navigate(page)
    }

    return (
        <>
        <div className='seller-container'>
            <div className="seller-login-page">
                <div className="seller-form">
                    <form className="seller-login-form" onSubmit={e=> e.preventDefault()}>
                        <input type="email" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        <input type="number" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        <button onClick={() => makeNewSellerUser()}>Create</button>
                        <p className="message">Already registered? <a onClick={() => navigationFunction('/sellerLogin')}>Login</a></p>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default SellerSignupPage