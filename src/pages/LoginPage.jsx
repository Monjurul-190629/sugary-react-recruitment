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
        <div className="min-h-screen px-10 md:py-32 flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-800 to-indigo-700 ">
            <form
                onSubmit={handleSubmit}
                className="relative bg-white/10 backdrop-blur-2xl text-white rounded-2xl p-8 shadow-xl w-full max-w-sm border border-white/20"
            >
                <h2 className="text-3xl font-bold mb-8 text-center tracking-wide drop-shadow-sm">
                    Welcome Back
                </h2>

                {error && (
                    <div className="bg-red-500/20 text-red-200 text-sm p-3 mb-4 rounded">
                        {error}
                    </div>
                )}

                <div className="mb-6 relative">
                    <input
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="peer w-full pt-5 px-4 pb-2 bg-transparent border border-white/30 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-blue-400"
                        placeholder="Email"
                    />
                    <label className="absolute left-4 top-2.5 text-sm text-white/60 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 transition-all duration-200 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-300">
                        Email
                    </label>
                </div>

                <div className="mb-8 relative">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="peer w-full pt-5 px-4 pb-2 bg-transparent border border-white/30 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-blue-400"
                        placeholder="Password"
                    />
                    <label className="absolute left-4 top-2.5 text-sm text-white/60 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 transition-all duration-200 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-300">
                        Password
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg transition-all duration-300"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>


    );
};

export default Login;
