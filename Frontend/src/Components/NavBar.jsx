import  { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); 
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <nav className="bg-gray-200 p-4 z-5" >
      <div className="flex justify-between items-center max-w-7xl mx-auto text-white">
        <div className="text-xl font-semibold text-gray-800">MLAfinder</div>
        <div className="relative" ref={dropdownRef}>
          <button
            id="google_translate_element"
            onClick={toggleDropdown}
            className="bg-gray-500 px-4 py-2 rounded-md focus:outline-none hover:cursor-pointer"
          >
            Credits
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">prsindia.org</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">www.maptiler.com</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">leafletjs.com</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
