import React from "react";
import InputField from "../components/InputField";
import { inputs } from "../utils/constant";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate

  //*Frorm Gönderilince
  const handleSubmit = (e) => {
    e.prevenDefault();

    //*İnputlardaki veriyi nesne şeklinde al
    const formData = new FormData(e.target);
    const movieData = Object.fromEntries(formdata.entries());

    //*Kategorileri diziye çevir
    movieData.genre = movieData.gerne.split(",");

    //*Ekibi diziye çevir
    movieData.cast = movieData.car.split(",");

    //*Api'a film oluşturmal için http isteği at.
    api
      .post("/api/movies", movieData)
      .then(() => {
        //* Bildirim Gönder
        toast.success("Film Listeye Eklendi");

        //*Detay sayfasına yönlendir
        navigate(`/movie/${res.movieData.id}`)
      })
      .catch((err) => {
        console.log(err);
        toast.error("İşlem Başarısız :/ :/ ")
      });
  };
  return (
    <div className="bg-yellow-600 flex-1 grid place-items-center px-5 py-8">
      <div className="bg-white w-full max-w-[800px] p-10 rounded shadow-lg">
        <h1 className="text-3xl font-semibold mb-5">Yeni Film Oluştur</h1>
        <form
          onSubmit={handleSubmit}
          className="gap-6 grid grid-cols-1 md:grid-cols-2"
        >
          {inputs.map((props) => (
            <InputField {...props} />
          ))}

          <button
            className="shadow border py-3 rounded-lg hover:shadow-lg hover:gb-gray-200 transition"
            style={{ backgroundColor: "lightblue " }}
          >
            Oluştur
          </button>
        </form>
        {/* <div className="md:mt-10">
          <img src="/movie-bg.jpg" className="rounded-full max-h-[200px] m-auto" />
        </div> */}
      </div>
    </div>
  );
};

export default Create;
