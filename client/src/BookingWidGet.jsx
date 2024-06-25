import { useContext, useEffect, useState } from "react"
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import { Navigate } from "react-router-dom"
import { UserContext } from "./UserContext"

function BookingWidGet ({place}) {
    const [checkIn , setCheckIn] = useState('')
    const [checkOut , setCheckOut] = useState('')
    const [guests , setGuests] = useState(1)
    const [name , setName] = useState('')
    const [phone , setPhone] = useState('')
    const [redirect , setRedirect ] = useState('')
    const {user} = useContext(UserContext)

    useEffect(() => {
        if(user){
            setName(user.name)
        }
    } , [user])

    let noOfDays = 0;
    if (checkIn && checkOut) {
        noOfDays = differenceInCalendarDays(new Date(checkOut) , new Date(checkIn)) 
    }

    async function bookPlace() {
        const data = {place , checkIn , checkOut , guests , name , phone , places:place._id , price:noOfDays * place.price}
        const response = await axios.post('http://localhost:4000/bookings' , data  )
        const bookingId = response.data._id
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if(redirect){
        return <Navigate to={redirect} />
    }


    return (
        <div className='bg-white shadow p-4 rounded-xl'>
                <div className='text-2xl text-center'>
                     Price: ${place.price} / per night
                </div>
                <div className='border rounded-2xl mt-4 flex'>
                    <div className='px-4 py-4'>
                        <label>Check in: </label>
                        <input type='date' value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                    </div>
                    <div className='px-4 py-4 border-l'>
                        <label>Check out: </label>
                        <input type='date' value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                    </div>
                </div>
                <div className='px-4 py-4'>
                    <label>Number of Guests: </label>
                    <input type='number' value={guests} onChange={(e) => setGuests(e.target.value)} />
                </div>
                {noOfDays > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Your Name: </label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
                        <label>Phone Number: </label>
                        <input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="XXXXXXXXXX" />
                    </div>
                )}
                <button onClick={bookPlace} className='primary mt-4'>
                    Book this place
                    {noOfDays > 0 && (
                            <span> ${noOfDays * place.price}</span>
                        )
                    }
                </button>
        </div>
    )
}
export default BookingWidGet