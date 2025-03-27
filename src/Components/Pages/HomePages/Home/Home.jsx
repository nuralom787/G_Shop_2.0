import React from 'react';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';

const Home = () => {
    return (
        <section className='bg-gray-100 space-y-16'>
            <Banner />
            <Categories />
        </section>
    );
};

export default Home;