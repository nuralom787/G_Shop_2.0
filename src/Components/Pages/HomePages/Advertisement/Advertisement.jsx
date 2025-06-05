import logo1 from '../../../Images/logo1.svg';
import logo5 from '../../../Images/logo5.svg';
import appStore from '../../../Images/app-store.svg';
import playStore from '../../../Images/play-store.svg';



const Advertisement = () => {
    return (
        <section className='advertisement bg-gray-200'>
            <div className="max-w-screen-2xl mx-auto px-4 xl:px-6 py-10 xl:py-24">
                <div className="flex justify-center lg:justify-between items-center gap-10">
                    <img className='w-2/6 hidden lg:block' src={logo1} alt="" />
                    <div className='w-full md:w-4/6 font-poppins text-[#151515] text-center space-y-6'>
                        <h1 className='text-lg lg:text-xl xl:text-3xl font-bold'>Get Your Daily Needs From Our KachaBazar Store</h1>
                        <p>There are many products you will find in our shop, Choose your daily necessary product from our G-shop and get some special offers.</p>
                        <div className='flex justify-center items-center gap-5'>
                            <img className='w-24' src={appStore} alt="" />
                            <img className='w-24' src={playStore} alt="" />
                        </div>
                    </div>
                    <img className='w-2/6 hidden lg:block' src={logo5} alt="" />
                </div>
            </div>
        </section>
    );
};

export default Advertisement;