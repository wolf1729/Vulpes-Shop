import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from '../App'
import SellerLoginPage from "../Components/sellerLoginPage";
import BuyerLoginPage from "../Components/buyerLoginPage";
import SellerSignupPage from "../Components/sellerSignupPage";
import BuyerSignupPage from "../Components/buyerSignupPage";
import SellerDashboardPage from "../Components/sellerDashboardPage";
import BuyerDashboard from "../Components/buyerDashboard";
import BuyerProductPage from "../Components/buyerProductPage";
import SellerProductPage from "../Components/sellerProductPage";
import BuyerCartPage from "../Components/buyerCartPage";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App />
        },
        {
            path: "/sellerLogin",
            element: <SellerLoginPage />
        },
        {
            path: "/buyerLogin",
            element: <BuyerLoginPage />
        },
        {
            path: '/sellerSignup',
            element: <SellerSignupPage />
        },
        {
            path: '/buyerSignup',
            element: <BuyerSignupPage />
        },
        {
            path: '/sellerDashboard',
            element: <SellerDashboardPage />
        },
        {
            path: '/buyerDashboard',
            element: <BuyerDashboard />
        },
        {
            path: '/cartPage',
            element: <BuyerCartPage />
        },
        {
            path: '/buyerProductPage/:productId',
            element: <BuyerProductPage />
        },
        {
            path: '/sellerProductPage/:productId',
            element: <SellerProductPage />
        }
    ]);

    return <RouterProvider router={router} />
}

export default Router;