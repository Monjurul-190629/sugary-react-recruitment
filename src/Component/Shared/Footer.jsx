const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-gray-100 py-4 px-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <div>© {year} Copyright</div>
            <div className="mt-2 sm:mt-0">Created by <span className="font-medium">Monjurul</span></div>
        </footer>
    );
};

export default Footer;
