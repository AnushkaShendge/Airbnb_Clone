import { Link, useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:4000/login',
                { email, password },
                { headers: { 'Content-Type': 'application/json' } } ,
            );
            setUser(response.data)
            if (response.data) {
                navigate('/');
                alert('Successful Login.');
            }
        } catch (error) {
            alert('Invalid Credentials.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="mt-6 grow flex items-center justify-center">
            <div className="mb-16">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="your@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            className="absolute right-3 top-4 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <BsEyeSlash /> : <BsEye />}
                        </span>
                    </div>
                    <button type="submit" className="primary mt-4">
                        Login
                    </button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet?
                        <Link className="underline text-black ml-1" to={'/register'}>
                            Register Now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
