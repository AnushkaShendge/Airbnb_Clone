import { useEffect , useState } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom'

function IndexPage(){
    const [places , setPlaces] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/places').then((response) => {
            setPlaces(response.data)
        }) 
    } , [])
    return(
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
            {places.length > 0  && 
                places.map((place) => (
                    <Link to={`/place/${place._id}`}>
                        <div className="bg-gray-500 rounded-2xl mb-1">
                            {
                                place.photos?.[0] && (
                                    <img src={'http://localhost:4000/uploads/'+place.photos?.[0]} alt="" className="rounded-2xl object-cover aspect-square " />
                                )
                            }
                        </div> 
                        <h2 className="text-xs truncate leading-4">{place.title}</h2>
                        <h3 className="font-bold text-gray-500">{place.address}</h3>
                        <div className="mt-2">
                            <span className="font-bold">${place.price}</span> per night
                        </div>
                    </Link>
                )
            )}
        </div>
    )
}
export default IndexPage;