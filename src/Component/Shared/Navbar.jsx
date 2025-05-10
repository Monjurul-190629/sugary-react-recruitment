import { Menu, X, LogIn, LayoutDashboard, Gift, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hookes/reduxHooks';
import { setCredentials } from '../../features/auth/authSlice';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const user = useAppSelector((state) => state.auth.user);
    const IMAGE_BASE_URL = 'https://d1wh1xji6f82aw.cloudfront.net/';
    const userDispatch = useAppDispatch();

    const handleLogOut = () => {
        userDispatch(setCredentials({
            token: null,
            refreshToken: null,
            user: null
        }));
    };

    return (
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md sticky top-0 z-50 w-full">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center text-white">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Gift className="w-6 h-6" />
                    <span className="text-xl font-bold">Sugary</span>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-6 font-medium">
                    <Link to="/dashboard" className="flex items-center gap-1 hover:text-yellow-300 transition">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>

                    {
                        user ? (
                            <div className="flex items-center gap-4">
                                <div className="relative group">
                                    <img
                                        src={`${IMAGE_BASE_URL}${user?.Avatar}`}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full border-2 border-white cursor-pointer"
                                    />
                                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-44 bg-white text-gray-800 border rounded-xl shadow-lg p-3 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 z-50">
                                        <h2 className="text-base font-semibold">{user?.FullName}</h2>
                                        <p className="text-sm text-gray-500">{user?.Email}</p>
                                    </div>
                                </div>
                                <button onClick={handleLogOut} className="flex items-center gap-1 hover:text-yellow-300 transition">
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/Login" className="flex items-center gap-1 hover:text-yellow-300 transition">
                                <LogIn className="w-4 h-4" />
                                Login
                            </Link>
                        )
                    }
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden text-white">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white px-4 pb-4 space-y-3 text-gray-800 font-medium">
                    <Link to="/dashboard" className="flex items-center gap-2 hover:text-indigo-600 transition">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>
                    {
                        user ? (
                            <>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={`${IMAGE_BASE_URL}${user?.Avatar}`}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <div>
                                        <h2 className="font-semibold">{user?.FullName}</h2>
                                        <p className="text-sm text-gray-500">{user?.Email}</p>
                                    </div>
                                </div>
                                <button onClick={handleLogOut} className="flex items-center gap-1 hover:text-indigo-600 transition">
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/Login" className="flex items-center gap-1 hover:text-indigo-600 transition">
                                <LogIn className="w-4 h-4" />
                                Login
                            </Link>
                        )
                    }
                </div>
            )}
        </header>
    );
};

export default Navbar;
