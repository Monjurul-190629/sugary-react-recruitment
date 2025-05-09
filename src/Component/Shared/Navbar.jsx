import { Menu, X, LogIn, UserPlus, LayoutDashboard, Gift, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hookes/reduxHooks';
import { setCredentials } from '../../features/auth/authSlice';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    // get user

    const user = useAppSelector((state) => state.auth.user)

    // LogOut

    const IMAGE_BASE_URL = 'https://d1wh1xji6f82aw.cloudfront.net/';

    const userDispatch = useAppDispatch();

    const handleLogOut = () => {
        userDispatch(setCredentials({
            token: null,
            refreshToken: null,
            user: null
        }))
    }

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 w-full">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Gift className="text-indigo-600 w-6 h-6" />
                    <span className="text-xl font-semibold text-indigo-600">Sugary</span>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
                    <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer">
                        <LayoutDashboard className="w-4 h-4" />
                        <Link to="/dashboard">Dashboard</Link>
                    </div>

                    <div>
                        {
                            user ?
                                <>
                                    <div className=" flex items-center gap-4">
                                        <div className="relative group">
                                            <img
                                                src={`${IMAGE_BASE_URL}${user?.Avatar}`}
                                                alt="avatar"
                                                className="w-8 h-8 rounded-full cursor-pointer"
                                            />
                                            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg p-3 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 z-50">
                                                <h2 className="text-base font-semibold text-gray-900">{user?.FullName}</h2>
                                                <p className="text-sm text-gray-500">{user?.Email}</p>
                                            </div>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <LogOut className="w-4 h-4" />
                                            <button onClick={handleLogOut}> logOut
                                            </button>
                                        </div>
                                    </div>
                                </> :
                                <>
                                    <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer">
                                        <LogIn className="w-4 h-4" />
                                        <Link to="/Login">Login</Link>
                                    </div>
                                </>
                        }
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white px-4 pb-4 space-y-3 text-gray-700 font-medium">
                    <div className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                        <LayoutDashboard className="w-4 h-4" />
                        <Link to="/dashboard">Dashboard</Link>
                    </div>
                    <div>
                        {
                            user ?
                                <>
                                    <div className=" flex items-center gap-4">
                                        <div className="relative group flex justify-center">
                                            <img
                                                src={`${IMAGE_BASE_URL}${user?.Avatar}`}
                                                alt="avatar"
                                                className="w-8 h-8 rounded-full cursor-pointer"
                                            />
                                            <div className="  bg-white border border-gray-200 rounded-xl shadow-lg scale-95  transition-all duration-200 z-50">
                                                <h2 className="text-base font-semibold text-gray-900">{user?.FullName}</h2>
                                                <p className="text-sm text-gray-500">{user?.Email}</p>
                                            </div>
                                        </div>


                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <LogOut className="w-4 h-4" />
                                        <button onClick={handleLogOut}> logOut
                                        </button> </div></> :
                        <>
                            <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer">
                                <LogIn className="w-4 h-4" />
                                <Link to="/Login">Login</Link>
                            </div>
                        </>
                        }
                    </div>

                </div>
            )}
        </header>
    );
};

export default Navbar;
