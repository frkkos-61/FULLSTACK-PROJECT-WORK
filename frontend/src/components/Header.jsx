import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-1 md:px-10 border-b shadow">
      <Link to="/" className="flex items-center">
        <img width={80} src="./public/movie-logo.png" alt="" />
        <h2 className="font-bold texy-2xl max-sm:hidden">Filmania</h2>
      </Link>

      <Link
        className="border rounded-full py-1 px-5 hover:bg-black hover:text-white transition"
        to="/Create"
      >
        Film Oluştur
      </Link>
    </header>
  );
};

export default Header;
