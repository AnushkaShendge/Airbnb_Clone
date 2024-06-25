import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Places from './Places'

import AccountNav from '../AccountNav'

function Account() {
    const [toHome, setToHome] = useState(null)
    const { ready, user, setUser } = useContext(UserContext)
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile'
    }

    async function logout() {
        await axios.post('http://localhost:4000/logout')
        setToHome('/')
        setUser(null)
    }

    if (!ready) {
        return <p>Loading...</p>;
    }
    if (ready && !user && !toHome) {
        return <Navigate to={'/login'} />
    }

    if (toHome) {
        return <Navigate to={toHome} />
    }
    return (
        <div>
            <AccountNav /> 
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.username} ({user.email})<br />
                    <button className='primary max-w-sm mt-2' onClick={logout}>Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <div>
                    <Places />
                </div>
            )}
        </div>
    )
}

export default Account
