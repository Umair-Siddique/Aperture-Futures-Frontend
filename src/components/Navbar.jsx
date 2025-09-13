import { motion } from "framer-motion";
import logo from "../assets/logo1.png";

const Navbar = ({ 
  scrollToHero, 
  scrollToLiveLines, 
  scrollToBlueLines, 
  scrollToThreeSteps, 
  scrollToPeople, 
  scrollToFaq, 
  scrollToFooter 
}) => {
  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: [0.16, 0.77, 0.47, 0.97] }}
      className="relative  top-6 left-1/2 -translate-x-1/2 flex items-center justify-between w-[90%] max-w-7xl z-50"
    >
      {/* Logo */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex items-center"
      >
        <img
          src={logo}
          alt="Company Logo"
          className="w-[180px] h-[50px] md:w-[224px] md:h-[62px]"
        />
      </motion.div>

      {/* Desktop Navigation */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="hidden md:block rounded-[50px] p-[1px]" 
        style={{
          background: `linear-gradient(10deg, 
                       #00EB8F 10%, 
                       #0A0F1C 50%,
                       #0A0F1C 70%, 
                       #00EB8F 80%)`
        }}
      >
        <nav className="
          inline-flex 
          items-center justify-center 
          gap-8 lg:gap-[64px] 
          text-[18px] font-inter font-regular text-white
          rounded-[48px] 
          bg-[#111111] 
          shadow-[0px_5px_15px_0px_#00000059]
          w-auto lg:w-[877px] h-[50px] lg:h-[60px] 
          px-6 lg:px-10 py-4 lg:py-4
        ">
          <NavLink onClick={scrollToHero} label="Home" active />
          <NavLink onClick={scrollToLiveLines} label="Livelines" />
          <NavLink onClick={scrollToBlueLines} label="Bluelines" />
          <NavLink onClick={scrollToThreeSteps} label="Crosslines" />
          <NavLink onClick={scrollToPeople} label="About" />
          <NavLink onClick={scrollToFaq} label="FAQs" />
          <NavLink onClick={scrollToFooter} label="Contact" />
        </nav>
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.button
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="md:hidden text-white focus:outline-none"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </motion.button>
    </motion.header>
  );
};

const NavLink = ({ onClick, label, active = false }) => {
  return (
    <button
      onClick={onClick}
      className={`
        hover:text-[#00EB8F] 
        transition-colors duration-300
        ${active ? "text-[#00EB8F]" : "text-white"}
        bg-transparent border-none cursor-pointer
      `}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </button>
  );
};

export default Navbar;