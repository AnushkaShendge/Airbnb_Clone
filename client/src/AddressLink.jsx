import { FaLocationDot } from "react-icons/fa6";

function AddressLink ({children , className=null}) {
    if(!className) {
        className = 'block my-2'
    }
    className += ' font-semibold underline'

    return (
        <a target='_blank' href={`https://www.google.com/maps/@?api=1&map_action=map${children}`} className={className}>

            <FaLocationDot className='inline-block mr-2 '/> 
            {children}
        </a>
    )
}

export default AddressLink;