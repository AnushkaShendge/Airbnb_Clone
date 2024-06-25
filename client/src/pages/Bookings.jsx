import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import AccountNav from "../AccountNav"
import PlaceImg from "../PlaceImg";
import axios from 'axios'

import { FaMoneyCheckDollar } from "react-icons/fa6";
import BookingDates from "../BookindDates";

function Bookings () { 
    const [bookings , setBookings] = useState([]) 
    useEffect(() => {
        axios.get('http://localhost:4000/bookings').then((result) => {
            setBookings(result.data)
        }).catch((err) => {
            if(err) throw err
        });
    } , [])
    return (
        <div>
            <AccountNav />
            <div>
                {bookings?.length > 0 && bookings.map(booking => (
                    <div className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden m-6">
                        <Link to={`/account/bookings/${booking._id}`} className="w-52">
                            <PlaceImg place={booking.places} />
                        </Link>
                        <div className="py-3 grow pr-3">
                            <h2 className="text-xl">{booking.places.title}</h2>
                            <BookingDates booking={booking} className=' text-gray-500 border-t' />
                            <div className="text-xl">
                                <div className="flex gap-1">
                                    <FaMoneyCheckDollar className="w-8 h-8" />Total Price: ${booking.price}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Bookings