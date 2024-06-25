import { FaRegCalendarCheck } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { differenceInCalendarDays, format } from "date-fns";


function BookingDates ({booking , className}) {
    return(
        <div className={"flex gap-2 border-gray-300 mt-4 py-2 text-sm " +className}>
                                <div className="flex gap-1">
                                    <IoMoon className="mt-1"/>{differenceInCalendarDays(new Date(booking.checkOut) , new Date(booking.checkIn))}nights
                                </div>:
                                <div className="flex gap-1 items-center">
                                    <FaRegCalendarCheck className="mt-1" />{format(new Date(booking.checkIn) , 'yyyy-MM-dd')}    
                                </div> 
                                &rarr; 
                                <div className="flex gap-1 items-center">
                                    <FaRegCalendarCheck />{format(new Date(booking.checkOut) , 'yyyy-MM-dd')}
                                </div>
                            </div>
    )
}

export default BookingDates