import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';
import Main from './Components/Pages/Main/Main';
import Home from './Components/Pages/HomePages/Home/Home';
import './App.css';
import ProductDetails from './Components/Pages/DetailPages/ProductDetails/ProductDetails';


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main />}>
              <Route path='/' element={<Home />}></Route>
              <Route path='/product/:id' element={<ProductDetails />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  )
}

export default App
