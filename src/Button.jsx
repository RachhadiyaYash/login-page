import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const Button = ({ text }) => {
  return (
    <div className="flex justify-center w-full px-4 border-red-900">
      <SpotlightButton text={text} />
    </div>
  );
};

const SpotlightButton = ({ text }) => {
  const btnRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { width } = e.target.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;

      spanRef.current.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      spanRef.current.animate(
        { left: "50%" },
        { duration: 100, fill: "forwards" }
      );
    };

    btnRef.current.addEventListener("mousemove", handleMouseMove);
    btnRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btnRef.current.removeEventListener("mousemove", handleMouseMove);
      btnRef.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      ref={btnRef}
      className="relative w-full overflow-hidden rounded-lg bg-black px-4 py-3 text-lg font-medium text-white"
    >
      {/* Add hover:text-black to change text color on hover */}
      <span className="pointer-events-none relative z-10 mix-blend-difference transition-colors duration-300 ease-in-out hover:text-black">
        {text}
      </span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-[#1FA84F] text-white"
      />
    </motion.button>
  );
};

export default Button;
