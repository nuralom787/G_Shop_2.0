import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';
import Main from './Components/Pages/Main/Main';
import Home from './Components/Pages/HomePages/Home/Home';
import ProductDetails from './Components/Pages/DetailPages/ProductDetails/ProductDetails';
import Search from './Components/Pages/Search/Search';
import Login from './Components/Pages/Authentication/Login/Login';
import Register from './Components/Pages/Authentication/Register/Register';
import AuthProvider from './Provider/AuthProvider';
import { ToastContainer } from 'react-toastify';
import MyAccount from './Components/Pages/UserAccount/MyAccount/MyAccount';
import Orders from './Components/Pages/UserAccount/Orders/Orders';
import Cart from './Components/Pages/Cart/Cart';
import './App.css';
import Dashboard from './Components/Pages/UserAccount/Dashboard/Dashboard';
import PrivetRoute from './PrivetRoute/PrivetRoute';
import Profile from './Components/Pages/UserAccount/Profile/Profile';
import Addresses from './Components/Pages/UserAccount/Addresses/Addresses';
import AddAddress from './Components/Pages/UserAccount/AddAddress/AddAddress';
import UpdateProfile from './Components/Pages/UserAccount/UpdatePages/UpdateProfile/UpdateProfile';
import UpdateAddress from './Components/Pages/UserAccount/UpdatePages/UpdateAddress/UpdateAddress';
import Checkout from './Components/Pages/Checkout/Checkout';


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <ToastContainer />
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Main />}>
                <Route path='/' element={<Home />}></Route>
                <Route path='/product/:id' element={<ProductDetails />}></Route>
                <Route path='/search' element={<Search />}></Route>
                <Route path='/user/cart' element={<PrivetRoute><Cart /></PrivetRoute>}></Route>
                <Route path='/user/checkout' element={<PrivetRoute><Checkout /></PrivetRoute>}></Route>
                <Route path='/user' element={<PrivetRoute><Dashboard /></PrivetRoute>}>
                  <Route path='/user/my-account' element={<MyAccount />}></Route>
                  <Route path='/user/profile' element={<Profile />}></Route>
                  <Route path='/user/profile/update' element={<UpdateProfile />}></Route>
                  <Route path='/user/addresses' element={<Addresses />}></Route>
                  <Route path='/user/addresses/add-address' element={<AddAddress />}></Route>
                  <Route path='/user/addresses/update/:id' element={<UpdateAddress />}></Route>
                  <Route path='/user/orders' element={<Orders />}></Route>
                </Route>
                <Route path='/user/login' element={<Login />}></Route>
                <Route path='/user/register' element={<Register />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
