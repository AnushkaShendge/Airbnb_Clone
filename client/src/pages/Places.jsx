import { Link, Navigate, useParams } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from 'axios';

function Places() {
    const [places , setPlaces] = useState([])
    useEffect(() => {
            axios.get('http://localhost:4000/user-places' , { withCredentials: true }).then(({data}) => {
            setPlaces(data)
        })
    } , [])
    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full" to={'/account/places/new'}>
                    <CiCirclePlus className="h-6 w-6" />
                    Add new places
                </Link>
            </div>
            <div className="mt-4 ">
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/' +place._id} className="flex cursor-pointer gap-2 bg-gray-100 rounded-2xl p-4 m-4">
                        <div className="flex w-32 h-32 bg-gray-300 shrink-0" >
                            {place.photos.length > 0  && (
                                <img src={'http://localhost:4000/uploads/'+place.photos[0]} alt="" className="object-cover" />
                            )}
                        </div>
                        <div className="grow-0 shrink ml-3">
                            <h2 className="text-xl"> {place.title} </h2>
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Places;
