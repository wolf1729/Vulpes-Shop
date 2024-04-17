import '../src/styles/app.css'
import { useNavigate } from "react-router-dom"

function App() {
  const navigate = useNavigate()
  const navigationFunction = (page) => {
    navigate(page)
  }

  return (
    <>
      <div className="mainContainer">
        <h1 className="heading">Vulpes Shop</h1>
        <div className="mainPageButtonContainer">
          <button className="sellerButton" onClick={() => navigationFunction('/sellerLogin')}>Seller Login</button>
          <button className="buyerButton" onClick={() => navigationFunction('/buyerLogin')}>Buyer Login</button>
        </div>
      </div>
    </>
  )
}

export default App
