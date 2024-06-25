import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import axios from 'axios';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://localhost:4000/register',
                { username, email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (res.data) {
                navigate('/login');
                alert('Registration Successful. Now you can log in');
            }
        } catch (error) {
            alert('Registration failed. Please try again');
            console.log('Error:', error);
        }
    };

    const handleShowPass = () => {
        setShowPass(!showPass);
    };

    return (
        <div className="mt-6 grow flex items-center justify-center">
            <div className="mb-16">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="your@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="relative">
                        <input
                            type={showPass ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="absolute right-3 top-4 cursor-pointer" onClick={handleShowPass}>
                            {showPass ? <BsEyeSlash /> : <BsEye />}
                        </span>
                    </div>
                    <button type="submit" className="primary mt-4">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already have an account?
                        <Link className="underline text-black ml-1" to={'/login'}>
                            Login Now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
