import '../styles/sellerLogin.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { existingUserDetails } from '../../utils/sellerAPI';
import { useCookies } from 'react-cookie';
import { useToast } from '@chakra-ui/react';
import sellerImage from '../Images/seller_3.jpg'

function SellerLoginPage() {
    const toast = useToast();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['user']);
    const navigate = useNavigate();

    const loginFunction = async () => {
        try {
            const response = await existingUserDetails(username, password);

            if (!response.sellerId) {
                // Show error toast if the sellerId is missing
                toast({
                    title: 'Invalid email or password. Please try again.',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
                return;
            }

            // Set user details and cookie, then navigate to the dashboard
            setCookie('user', response);
            navigate('/sellerDashboard');
        } catch (err) {
            console.error('Login error:', err);
            // Display a general error toast for exceptions
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
        loginFunction();
    };

    return (
        <div className='seller-container'>
            <div className='sellerImageContainer'>
                <img src={sellerImage} alt="" className='sellerImage'/>
            </div>
            <div className="seller-login-page">
                <div className="seller-form">
                    <form className="seller-login-form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                        <p className="message">
                            Not registered? <a onClick={() => navigate('/sellerSignup')}>Create an account</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SellerLoginPage;
