import '../styles/sellerLogin.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { existingUserDetails } from '../../utils/sellerAPI'
import { useCookies } from 'react-cookie'

function SellerLoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [userDetails, setUserDetails] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['user'])
    const navigate = useNavigate()

    const loginFunction = async() => {
        try{
            let response = await existingUserDetails(username, password)
            setUserDetails(response)
            setCookie('user', response)
            console.log(userDetails)
            navigationFunction('/sellerDashboard')
        }
        catch(err) {
            console.log('User not found')
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
                    <form className="seller-login-form" onSubmit={e=> e.preventDefault()} >
                        <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button onClick={() => loginFunction()}>login</button>
                        <p className="message">Not registered? <a onClick={() => navigationFunction('/sellerSignup')}>Create an account</a></p>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default SellerLoginPage