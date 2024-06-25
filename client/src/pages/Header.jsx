import { FaAirbnb } from "react-icons/fa";
import { IoSearchCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import {Link} from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../UserContext";


function Header() {
    const {user} = useContext(UserContext)
    return (
        <div>
            <header className='flex justify-between'>
                <Link to={'/'} className='flex items-center gap-1'><FaAirbnb className='w-8 h-8'/>
                    <span className='font-bold text-xl'>airbnb</span>
                </Link>
                <div className='flex gap-2 border border-gray-400 rounded-full py-2 px-4 shadow-md shadow-gray-300 '>
                    <div>Anywhere</div>
                    <div className='border border-l border-gray-400' />
                    <div>Any week</div>
                    <div className='border border-l border-gray-400' />
                    <div>Add guests</div>
                    <div className='border border-l border-gray-400' />
                    <button className='text-primary'>
                        <IoSearchCircle  className='w-10 h-8'/>
                    </button>
                </div>
                <Link to={user ? '/account' : '/login'} className='flex gap-2 border border-gray-400 rounded-full py-2 px-2 items-center'>
                    <IoMenu className='w-8 h-8' />
                    <FaUserCircle className='w-8 h-8 text-gray-500' />
                    {!!user && (
                        <div>
                            {user.username}
                        </div>
                    )}
                </Link>
            </header>
        </div>
    
    )

}

export default Header;