import { Menu, X, LogIn, UserPlus, LayoutDashboard, Gift } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

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
                        <Link to = "/dashboard">Dashboard</Link>
                    </div>
                    <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer">
                        <LogIn className="w-4 h-4" />
                        <Link to = "/Login">Login</Link>
                    </div>
                    <div className="flex items-center gap-1 hover:text-indigo-600 cursor-pointer">
                        <UserPlus className="w-4 h-4" />
                        <span>Register</span>
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
                        <Link to = "/dashboard">Dashboard</Link>
                    </div>
                    <div className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                        <LogIn className="w-4 h-4" />
                        <span>Login</span>
                        <Link to = "/Login">Login</Link>
                    </div>
                    <div className="flex items-center gap-2 hover:text-indigo-600 cursor-pointer">
                        <UserPlus className="w-4 h-4" />
                        <span>Register</span>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
