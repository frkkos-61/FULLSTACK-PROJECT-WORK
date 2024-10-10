import React, { useEffect } from "react";
import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";
import Hero from "../components/Hero";
import { useSearchParams } from "react-router-dom";

const Main = () => {
  const [params, setParams] = useSearchParams();

  const options = {
    params: {
      query:params.get("query"),
    }
  }

  console.log(options);


  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["movies",options],
       queryFn: () =>
      api.get("http://localhost:6154/api/movies").then((res) => res.data),
  });

  console.log(data);

  return (
    <div className="">
      <Hero/>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error} refetch={refetch} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-5 md:px-10 mt-10">
          {data.map((movie) => (
            <Card movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
