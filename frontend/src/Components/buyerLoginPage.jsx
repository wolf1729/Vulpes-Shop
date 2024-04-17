import '../styles/buyerLogin.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { existingBuyerUserDetails } from '../../utils/buyerAPI'
import { useCookies } from 'react-cookie'

function BuyerLoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['user'])
    const navigate = useNavigate()

    const buyerLoginFunction = async() => {
        try{
            let response = await existingBuyerUserDetails(username, password)
            setCookie('user', response)
            navigationFunction('/buyerDashboard')
        }
        catch(err) {
            console.log(err)
        }
    }

    const navigationFunction = (page) => {
        navigate(page)
    }

    return (
        <>
        <div className='buyer-container'>
            <div className="buyer-login-page">
                <div className="buyer-form">
                    <form className="buyer-login-form" onSubmit={e=> e.preventDefault()}>
                        <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button onClick={() => buyerLoginFunction()}>login</button>
                        <p className="message">Not registered? <a onClick={() => navigationFunction('/buyerSignup')}>Create an account</a></p>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default BuyerLoginPage