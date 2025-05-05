import { Helmet } from 'react-helmet-async';
import useMyAccount from '../../../../Hooks/useMyAccount';
import { Link } from 'react-router';

const Profile = () => {
    const [account] = useMyAccount();


    return (
        <section className="bg-white p-4 rounded font-inter">
            <Helmet>
                <title>G-Shop | Profile</title>
            </Helmet>
            <h3 className="mb-2 font-semibold text-[#151515] text-lg">My Profile</h3>
            <div className='divider before:bg-black after:bg-black my-2'></div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                <div className='m-3 space-y-1.5'>
                    <span className='text-xs'>Full Name</span>
                    <p className='font-semibold text-sm leading-8'>{account?.displayName}</p>
                </div>
                <div className='m-3 space-y-1.5'>
                    <span className='text-xs'>Email Address</span>
                    <p className='font-semibold text-sm leading-8'>{account?.email?.split('@')[0].slice(0, 2) + '*'.repeat(account?.email?.split('@')[0].length - 2) + '@' + account?.email?.split('@')[1]}</p>
                </div>
                <div className='m-3 space-y-1.5'>
                    <span className='text-xs'>Mobile</span>
                    {account?.phoneNumber ? <p className='font-semibold text-sm leading-8'>{account.phoneNumber}</p> : <p className='font-medium text-sm text-[#9e9e9e] leading-10'>Please enter your mobile</p>}
                </div>
                <div className='m-3 space-y-1.5'>
                    <span className='text-xs'>Birthday</span>
                    {account?.dob ? <p className='font-semibold text-sm leading-8'>{account.dob}</p> : <p className='font-medium text-sm text-[#9e9e9e] leading-10'>Please enter your birthday</p>}
                </div>
                <div className='m-3 space-y-1.5'>
                    <span className='text-xs'>Gender</span>
                    {account?.gender ? <p className='font-semibold text-sm leading-8'>{account.gender}</p> : <p className='font-medium text-sm text-[#9e9e9e] leading-10'>Please enter your gender</p>}
                </div>
            </div>
            <div className='py-4 mx-4'>
                <Link to="/" className='block w-fit duration-300 uppercase bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded font-semibold text-sm'>Edit Profile</Link>
            </div>
        </section>
    );
};

export default Profile;