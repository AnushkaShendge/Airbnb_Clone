import { useEffect , useState } from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import BookingWidGet from '../BookingWidGet';
import PlaceGallary from '../PlaceGallary';
import AddressLink from '../AddressLink';

function PlacePage (){
    const {id} = useParams();
    const [place , setPlace] = useState(null);
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get(`/places/${id}`).then((response) => {
            setPlace(response.data);
        })
    } , [id])
    if(!place){
        return ''
    }
    return(
        <div className='mt-4 py-8 bg-gray-100 mx-8 px-8'>
            <h1 className='text-3xl'>{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallary place={place} />
                <div className='mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
                    <div>
                        <div className='my-4'>
                            <h2 className='font-semibold text-2xl'>Description</h2>
                            {place.description}
                        </div>
                        Check-in: {place.checkIn} am<br />
                        Check-out: {place.checkOut} am<br />
                        Maximum number of Guests: {place.maxGuests}<br />
                    </div>
                    <div>
                    <BookingWidGet place={place}/>
                </div>
            </div>
            <div className='bg-white -mx-8 px-8 pt-8 border-t'>
                <div>
                    <h2 className='font-semibold text-2xl'>Extra Information</h2>
                </div>
                <div className='mb-4 mt-1 text-gray-700 text-sm leading-5'>
                    {place.extraInfo}
                </div>
            </div>
        </div>
    )
}
export default PlacePage;