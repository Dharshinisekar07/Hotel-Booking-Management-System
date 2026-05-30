import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; 
import { assets } from "../assets/assets";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AddContext";

const BookIcon = () => (
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" 
            strokeWidth="2" d="M5 19v4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
    </svg>
);

const Navbar = () => {
   const navLinks = [
  { name: 'Home',       path: '/' },
  { name: 'Hotel',      path: '/rooms' },
  { name: 'Experience', path: '/experience' },
  { name: 'About',      path: '/about' },
];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { openSignIn } = useClerk();
    const location = useLocation();

    const {user, navigate, isOwner} = useAppContext()

    useEffect(() => {
    if(location.pathname !== '/'){
        setIsScrolled(true);
        return;
    }else{
        setIsScrolled(false)
    }
    setIsScrolled(prev=> location.pathname !=='/' ? true :prev);
    



        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 
            ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6 text-white"}`}>

          {/* Logo */}
          
            <Link to='/' >
            <img src={assets.logo} alt="Logo" className={`h-9 ${isScrolled ? "invert opacity-80" : ""}`}/>
            </Link>

            {/* Desktop Navigation & Actions */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
                {navLinks.map((link, i) => (
                    <Link key={i} to={link.path} className="group flex flex-col gap-0.5">
                        {link.name}
                        <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0
                         group-hover:w-full transition-all duration-300`} />
                    </Link>
                ))}
                
                 { user && (
               <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer
                ${isScrolled ? 'text-black' : 'text-white'} transition-all`} onClick={()=> navigate('/owner')}
                >
                    Dashboard
               </button>
                 )
                }


                <img src={assets.searchIcon} alt="search" className={`${isScrolled && 'invert'} h-7 cursor-pointer`} />

                {user ? (
                    <UserButton afterSignOutUrl="/">
                        <UserButton.MenuItems>
                            <UserButton.Action label="My Bookings" labelIcon={<BookIcon />} onClick={() => navigate('/my-bookings')} />
                        </UserButton.MenuItems>
                    </UserButton>
                ) : (
                    <button onClick={openSignIn} className={`px-8 py-2.5 rounded-full transition-all duration-500 ${isScrolled ? "text-white bg-black" : "bg-white text-black"}`}>
                        Login
                    </button>
                )}
            </div>

            {/* Mobile Actions (Visible only on small screens) */}
            <div className="flex items-center gap-4 md:hidden">
                {user && (
                    <UserButton afterSignOutUrl="/">
                        <UserButton.MenuItems>
                            <UserButton.Action label="My Bookings" labelIcon={<BookIcon />} onClick={() => navigate('/my-bookings')} />
                        </UserButton.MenuItems>
                    </UserButton>
                )}
                <img onClick={() => setIsMenuOpen(true)} src={assets.menuIcon} alt="menu" className={`${isScrolled && "invert"} h-6 cursor-pointer`} />
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed top-0 left-0 w-full h-screen bg-white text-gray-800 flex flex-col items-center justify-center gap-6 font-medium transition-transform duration-500 z-[60]
                 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                
                <button className="absolute top-6 right-6" onClick={() => setIsMenuOpen(false)}>
                    <img src={assets.closeIcon} alt="close" className="h-8" />
                </button>

                {navLinks.map((link, i) => (
                    <Link key={i} to={link.path} className="text-xl" onClick={() => setIsMenuOpen(false)}>
                        {link.name}
                    </Link>
                ))}

                {user && <button className="border px-4 py-1 text-sm font-light
                 rounded-full cursor-pointer transition-all" onClick={()=> isOwner ? navigate('/owner')  : setShowHotelReg(true)}>
                    {isOwner ? 'Dashboard' : 'List Your Hotel'}
                    </button>}
                
                   {!user && <button onClick={() => { openSignIn(); setIsMenuOpen(false); }} 
                   className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                        Login
                    </button>}
            </div>
        </nav>
    );
};

export default Navbar;
