import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hookes/reduxHooks';
import { setCredentials } from '../features/auth/authSlice';
import { login } from '../features/auth/authApi';

const Login = () => {
    const [username, setUsername] = useState('react@test.com');
    const [password, setPassword] = useState('playful009');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await login({ UserName: username, Password: password });
            if (res?.Success) {
                dispatch(setCredentials({
                    token: res.Token,
                    refreshToken: res.RefreshToken,
                    user: res.User,
                }));
                navigate('/dashboard');
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            setError('Invalid credentials or server error.', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                {error && <div className="text-red-600 mb-4">{error}</div>}

                <div className="mb-4">
                    <label className="block mb-1">Username</label>
                    <input
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
