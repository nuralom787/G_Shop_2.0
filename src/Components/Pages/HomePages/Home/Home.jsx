import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import PopularProducts from '../PopularProducts/PopularProducts';
import DiscountProducts from '../DiscountProducts/DiscountProducts';
import Advertisement from '../Advertisement/Advertisement';
import { Helmet } from 'react-helmet-async';

const Home = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <section className='bg-gray-100 space-y-16'>
            <Helmet>
                <title>G-Shop | Home</title>
            </Helmet>
            <Banner />
            <Categories />
            <PopularProducts />
            <DiscountProducts />
        </section>
    );
};

export default Home;