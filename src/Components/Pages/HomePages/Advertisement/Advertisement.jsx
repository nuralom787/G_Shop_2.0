import logo1 from '../../../Images/logo1.svg';
import logo5 from '../../../Images/logo5.svg';
import appStore from '../../../Images/app-store.svg';
import playStore from '../../../Images/play-store.svg';



const Advertisement = () => {
    return (
        <section className='advertisement bg-gray-200'>
            <div className="max-w-screen-2xl mx-auto px-6 py-24">
                <div className="flex justify-between items-center gap-10">
                    <img className='w-md' src={logo1} alt="" />
                    <div className='font-poppins text-[#151515] text-center space-y-6'>
                        <h1 className='text-3xl font-bold'>Get Your Daily Needs From Our KachaBazar Store</h1>
                        <p>There are many products you will find in our shop, Choose your daily necessary product from our G-shop and get some special offers.</p>
                        <div className='flex justify-center items-center gap-5'>
                            <img src={appStore} alt="" />
                            <img src={playStore} alt="" />
                        </div>
                    </div>
                    <img className='w-md' src={logo5} alt="" />
                </div>
            </div>
        </section>
    );
};

export default Advertisement;