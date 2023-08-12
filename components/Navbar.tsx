import { useCallback, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuVisible((prev) => !prev);
  }, []);

  const [isAccountMenuVisible, setIsAccountMenuVisible] = useState(false);

  const toggleAccountMenu = useCallback(() => {
    setIsAccountMenuVisible((prev) => !prev);
  }, []);

  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) setShowBg(true);
      else setShowBg(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full fixed z-40">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBg ? "bg-zinc-900/90" : ""}`}>
        <img src="/images/logo.png" alt="logo" className="h-4 lg:h-7" />
        <div className="ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browser by languages" />
        </div>

        <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown className={`text-white transition ${isMobileMenuVisible && "rotate-180"}`} />
          <MobileMenu visible={isMobileMenuVisible} />
        </div>

        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="" />
            </div>
            <BsChevronDown className={`text-white transition ${isAccountMenuVisible && "rotate-180"}`} />
            <AccountMenu visible={isAccountMenuVisible} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
