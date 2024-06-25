import { useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { Navigate, useParams } from 'react-router-dom'; // Add this import
import axios from 'axios'; // Ensure axios is imported
import Perks from '../Perks'; // Ensure correct import path
import AccountNav from '../AccountNav';
import { GiTrashCan } from "react-icons/gi";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

function PlacesForm() {
    const {id} = useParams()
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [price , setPrice ] = useState('');

    useEffect(() => {
        if(!id) {
            return
        }
        axios.get(`http://localhost:4000/places/${id}`).then(response => {
            const { data } = response;
                setTitle(data.title || '');
                setAddress(data.address || '');
                setAddedPhotos(data.photos || []);
                setDescription(data.description || '');
                setPerks(data.perks || []);
                setExtraInfo(data.extraInfo || '');
                setCheckIn(data.checkIn || '');
                setCheckOut(data.checkOut || '');
                setMaxGuests(data.maxGuests || '');
                setPrice(data.price || '');
        })
    } , [id])
    async function addPhotoByLink(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/upload-by-link', { link: photoLink });
            setAddedPhotos(prev => [...prev, response.data.filename]);
            setPhotoLink('');
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    }

    async function uploadPhoto(e) {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        try {
            const response = await axios.post('http://localhost:4000/upload', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (Array.isArray(response.data)) {
                setAddedPhotos(prev => [...prev, ...response.data]);
            } else {
                console.error('Unexpected response structure:', response.data);
            }
        } catch (error) {
            console.error('Error uploading photos:', error);
        }
    }

    async function savePlace(e) {
        e.preventDefault();
        const data = {
            title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests,price
        };
        if(id){
            //update
            try {
                await axios.put('http://localhost:4000/places', {id , data});
                setRedirect(true);
            } catch (error) {
                console.error('Error adding new place:', error);
            }
        }else{
            try {
                await axios.post('http://localhost:4000/places', data);
                setRedirect(true);
            } catch (error) {
                console.error('Error adding new place:', error);
            }
        }
    }

    if (redirect) {
        return <Navigate to='/account/places' />;
    }
    function removePhoto(e , filename) {
        e.preventDefault()
        setAddedPhotos(addedPhotos.filter(photo => photo !== filename));
    }
    function selectAsMainPhoto(e , filename) {
        e.preventDefault()
        setAddedPhotos([filename, ...addedPhotos.filter(photo => photo !== filename)]);
    }
    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                <h2 className="text-2xl mt-4">Title</h2>
                <p className="text-gray-500">Title for your place, should be short and catchy</p>
                <input
                    type='text'
                    placeholder="Title, for example: My Apt"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <h2 className="text-2xl mt-4">Address</h2>
                <p className="text-gray-500">Address to this place</p>
                <input
                    type='text'
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <h2 className="text-2xl mt-4">Photos</h2>
                <p className="text-gray-500">More equals to better</p>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder={'Add using a link ...jpg'}
                        value={photoLink}
                        onChange={e => setPhotoLink(e.target.value)}
                    />
                    <button
                        className="flex bg-primary text-white rounded-2xl p-4"
                        onClick={addPhotoByLink}
                    >
                        Add&nbsp;photo
                    </button>
                </div>
                <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
                    {addedPhotos.length > 0 && addedPhotos.map(link => (
                        <div className='h-32 flex relative' key={link} >
                            <img
                                src={`http://localhost:4000/uploads/${link}`}
                                className="rounded-2xl w-full object-cover"
                                alt="Uploaded"
                            />
                            <button onClick={(e) => removePhoto(e,link)} className='absolute bottom-1 right-1 text-white bg-black py-2 px-3 rounded-2xl bg-opacity-50 cursor-pointer' >
                                <GiTrashCan />
                            </button>
                            <button onClick={(e) => selectAsMainPhoto(e,link)} className='absolute bottom-1 left-1 text-white bg-black py-2 px-3 rounded-2xl bg-opacity-50 cursor-pointer' >
                                {link === addedPhotos[0] && (
                                    <FaStar />
                                )}
                                {link !== addedPhotos[0] && (
                                    <CiStar />
                                )}
                            </button>
                        </div>
                    ))}
                    <label className="cursor-pointer flex justify-center items-center gap-1 border bg-transparent rounded-2xl p-8 text-xl text-gray-500 m-2">
                        <FaCloudUploadAlt className="w-7 h-7" /> Upload
                        <input
                            type="file"
                            multiple
                            className="hidden"
                            onChange={uploadPhoto}
                        />
                    </label>
                </div>
                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-500">Description for your place</p>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <h2 className="text-2xl mt-4">Perks</h2>
                <p className="text-gray-500">Select all the perks of your place</p>
                <Perks
                    selected={perks}
                    onChange={(newPerks) => setPerks(newPerks)}
                />
                <h2 className="text-2xl mt-4">Extra Info</h2>
                <p className="text-gray-500">House rules, etc</p>
                <textarea
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                />
                <h2 className="text-2xl mt-4">Check in & out times</h2>
                <p className="text-gray-500">Add check in and out times, remember to have some time window for cleaning the room between guests</p>
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input
                            type="number"
                            placeholder="14:00"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input
                            type="number"
                            placeholder="11:00"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Maximum number of guests</h3>
                        <input
                            type="number"
                            placeholder="4"
                            value={maxGuests}
                            onChange={(e) => setMaxGuests(e.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Prices</h3>
                        <input
                            type="number"
                            placeholder="4"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>
                <button className="primary my-4">Save</button>
            </form>
        </div>
    );
}

export default PlacesForm;
