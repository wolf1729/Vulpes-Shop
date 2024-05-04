import '../styles/buyerLogin.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { existingBuyerUserDetails } from '../../utils/buyerAPI';
import { useCookies } from 'react-cookie';
import { useToast } from '@chakra-ui/react';
import sellerLoginImage from '../Images/buyerLogin.jpg'

function BuyerLoginPage() {
    const toast = useToast();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['user']);
    const navigate = useNavigate();

    const navigationFunction = (page) => {
        navigate(page);
    };

    const buyerLoginFunction = async () => {
        try {
            const response = await existingBuyerUserDetails(username, password);
            
            if (response.buyerId === null) {
                // Show error toast if buyerId is null
                toast({
                    title: 'Invalid email or password. Please try again.',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
                return
            }
            toast({
                title: 'Login successful.',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });

            // Set the user cookie and navigate to dashboard if login is successful
            setCookie('user', response);
            navigationFunction('/buyerDashboard');
        } catch (err) {
            // Log the error for debugging and show an error toast
            console.error('Login error:', err);
            toast({
                title: 'An error occurred during login. Please try again.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        buyerLoginFunction();
    };

    return (
        <div className='buyer-container'>
            <div className='buyerImageContainer'>
                <img src={sellerLoginImage} alt="" className='buyerImage'/>
            </div>
            <div className="buyer-login-page">
                <div className="buyer-form">
                    <form className="buyer-login-form" onSubmit={handleSubmit}>
                        <input type="email" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit">Login</button>
                        <p className="message">Not registered? <a onClick={() => navigationFunction('/buyerSignup')}>Create an account</a></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BuyerLoginPage;
