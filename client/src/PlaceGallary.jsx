import { useState } from "react";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

function PlaceGallary ({place}) {
    const [showPhotos , setShowPhotos] = useState(false);

    if(showPhotos) {
        return (
            <div className='absolute bg-white min-h-screen inset-0'>
                <div className='p-8 grid gap-4'>
                    <div>
                        <h2 className='text-3xl mr-48 font-serif font-semibold'>Photos of {place.title}</h2>
                        <button onClick={() => setShowPhotos(false)} className='fixed right-12 top-6 py-2 px-4 rounded-2xl bg-black text-white shadow shadow-black'>
                            <IoClose />
                        </button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div>
                            <img src={`http://localhost:4000/uploads/${photo}`} alt={place.name} className='w-full h-full object-cover' />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    return(
        <div className='relative' >
                <div className='grid gap-2 grid-cols-1 md:grid-cols-[2fr_1fr] rounded-3xl overflow-hidden'>
                    <div>
                        {place.photos?.[0]  && (
                            <div>
                                <img onClick={() => setShowPhotos(true)} className='aspect-square object-cover w-full h-full' src={`http://localhost:4000/uploads/${place.photos[0]}`} />
                            </div>
                        )}
                    </div>
                    <div className='grid'>
                        {place.photos?.[1]  && (
                            <img onClick={() => setShowPhotos(true)} className='cursor-pointer aspect-square object-cover w-full h-full' src={`http://localhost:4000/uploads/${place.photos[1]}`} />
                        )}
                        <div className='overflow-hidden'>
                            {place.photos?.[2]  && (
                                <img onClick={() => setShowPhotos(true)} className='cursor-pointer aspect-square object-cover w-full h-full relative top-2' src={`http://localhost:4000/uploads/${place.photos[2]}`} />
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={()=>setShowPhotos(true)} className='cursor-pointer flex gap-1 absolute bottom-2 right-2 px-4 py-2 bg-white rounded-2xl shadow shodow-md shadow-gray-500'><BsFillGrid1X2Fill className='m-1' />Show more photos</button>
            </div>
    )
}

export default PlaceGallary