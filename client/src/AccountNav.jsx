import { useLocation , Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { CiBookmarkCheck } from "react-icons/ci";
import { FaHome } from "react-icons/fa";

function AccountNav () {
    const {pathname} = useLocation()
    let subpage = pathname.split('/')?.[2]
    if (subpage === undefined) {
        subpage = 'profile'
    }
    function linkClasses(type = null) {
        let classes = 'py-2 px-6 rounded-full'
        if (type === subpage) {
            classes += ' bg-primary text-white';
        }
        else{
            classes += ' bg-gray-200'
        }

        return classes
    }
    return(
        <nav className='w-full flex justify-center mt-8 gap-2 mb-8'>
            <Link className={linkClasses('profile')} to={'/account'}>
                <CgProfile className='inline h-4 w-4 mr-2 mb-1' />   
                My Profile
            </Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                <CiBookmarkCheck className='inline h-4 w-4 mr-2 mb-1' />
                My Bookings
            </Link>
            <Link className={linkClasses('places')} to={'/account/places'}>
                <FaHome className='inline h-4 w-4 mr-2 mb-1' />
                My Accommodations
            </Link>
        </nav>
    )
}
export default AccountNav 