const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 py-4 px-6 flex flex-col text-lg sm:flex-row justify-between items-center  text-gray-100 bg">
            <div>© {year} Copyright</div>
            <div className="mt-2 sm:mt-0 ">Created by <span className="font-medium">Monjurul</span></div>
        </footer>
    );
};

export default Footer;
