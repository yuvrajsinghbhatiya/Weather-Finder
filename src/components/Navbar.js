import React from 'react';
import { BiHomeAlt2 } from 'react-icons/bi';

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 text-white md:p-2 lg:p-4 xl:p-6">
      <div className="flex items-center justify-between">
        <button onClick={() => window.location.reload()}>
          <BiHomeAlt2 size={30} className="cursor-pointer text-white" />
        </button>
        <h1 className="text-2xl text-white md:text-2xl lg:text-3xl xl:text-3xl font-semibold mt-2" style={{ letterSpacing: '1px'}}>
          WEATHER FiNDER
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
