import './App.css';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';
import Main from './Components/Pages/Main/Main';
import Home from './Components/Pages/HomePages/Home/Home';


function App() {
  const queryClient = new QueryClient();



  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}>
            <Route path='/' element={<Home />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
