import React from 'react';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import PopularProducts from '../PopularProducts/PopularProducts';
import DiscountProducts from '../DiscountProducts/DiscountProducts';

const Home = () => {
    return (
        <section className='bg-gray-100 space-y-16'>
            <Banner />
            <Categories />
            <PopularProducts />
            <DiscountProducts />
        </section>
    );
};

export default Home;