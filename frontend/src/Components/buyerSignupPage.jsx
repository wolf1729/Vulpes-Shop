import { useState } from 'react';
import '../styles/buyerLogin.css';
import { useNavigate } from 'react-router-dom';
import { newBuyerSignUp } from '../../utils/buyerAPI';
import { useToast } from '@chakra-ui/react';
import buyerSignUpImage from '../Images/buyerSignup.jpg'

function BuyerSignupPage() {
    const toast = useToast();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const makeNewUser = async () => {
        try {
            const result = await newBuyerSignUp(name, username, password);

            if (result === false){
                toast({
                    title: 'Something went wrong, please try again',
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                });
            }

            toast({
                title: 'Buyer account created successfully.',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });

            navigate('/buyerLogin');
        } catch (err) {
            console.error('Error creating buyer:', err);

            toast({
                title: 'An error occurred during account creation. Please try again.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        makeNewUser();
    };

    return (
        <>
            <div className='buyer-container'>
                <div className='buyerImageContainer'>
                    <img src={buyerSignUpImage} alt="" className='buyerSignUpImage'/>
                </div>
                <div className="buyer-login-page">
                    <div className="buyer-form">
                        <form className="buyer-login-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
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
                            <button type='submit'>Create</button>
                            <p className="message">
                                Already registered? <a onClick={() => navigate('/buyerLogin')}>Login</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BuyerSignupPage;
