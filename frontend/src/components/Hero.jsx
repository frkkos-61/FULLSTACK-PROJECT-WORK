import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Hero = () => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('query');
    if (query) {
      navigate(`/?query=${encodeURIComponent(query)}`);
    }
  };
  return (
    <div className="px-10 py-20 lg:px-20  bg-center bg-cover text-white"
    style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('wick.jpg')" }}
    >
      <h1 className="text-4xl md:text-5xl">Hoşgeldin.</h1>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
        Milyonlarca Film, Dizi ve Aktörleri Keşfet
      </h2>
      <form onSubmit={handleSubmit} className="rounded-lg overflow-hidden flex mt-5"/>
      <div className="rounded-lg overflow-hidden flex mt-5">
        <input defaultValue={params.get("query")} type="text" placeholder="Film, Dizi, Aktör arayın..." className="w-full py-2 px-4 text-black"/>
        <button className="bg-blue-500 px-5 font-semibold hover:bg-blue-600">Ara</button>
      </div>
    </div>
  );
};

export default Hero;
