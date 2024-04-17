import { useState } from 'react'
import '../styles/buyerLogin.css'
import { useNavigate } from 'react-router-dom'
import { newBuyerSignUp } from '../../utils/buyerAPI'

function BuyerSignupPage() {
    const navigate = useNavigate()
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const [name, setName] = useState('')

    const makeNewUser = async() => {
        try{
            await newBuyerSignUp(name, username, password)
            console.log('buyer created')
            navigationFunction('/buyerLogin')
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
                        <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
                        <input type="email" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button onClick={() => makeNewUser()}>Create</button>
                        <p className="message">Already registered? <a onClick={() => navigationFunction('/buyerLogin')}>Login</a></p>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default BuyerSignupPage