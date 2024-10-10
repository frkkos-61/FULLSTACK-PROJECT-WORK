import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import ListField from "../components/ListField";
import DeleteButton from "../components/DeleteButton";

const Detail = () => {
  const { id } = useParams();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["movie"],
    queryFn: () => api.get(`/api/movies/${id}`).then((res) => res.data),
  });

  if (isLoading) return <Loader />;

  if (error) return <Error info={error} refetch={refetch} />;

  return (
    <div className="p-10">
      <div className="flex justify-end">
        <DeleteButton id={data.id} />
      </div>
      <div className="flex flex-col gap-10 items-center">
        <div>
          <img
            className="rounded-md"
            src={`https://picsum.photos/seed/${data.id}/250/400`}
            alt="poster"
          />
        </div>
        <div className="flex flex-col gap-10">
          {/**Başlık */}
          <div>
            <h1 className="text-3xl font-semibold mb-3">{data.title}</h1>
            <p className="font-bold">{data.description}</p>
          </div>

          {/**Skor */}

          {/** */}
          <p>
            <span className="font-bold me-3">İzleyici Skoru : </span>
            <span className="p-2 rounded-full  font-bold bg-gray-200">
              {Number(data.rating).toFixed(1)}
            </span>
          </p>
          <div className="grid gap-10 md:grid-cols-2">
            {/**Dil */}
            <Field label="Dil" value={data.language} />

            {/**Süre */}
            <Field label="Süre" value={data.duration} />

            {/**Yapımcı */}
            <Field label="Yapımcı" value={data.director} />

            {/**Yıl */}
            <Field label="Yıl" value={data.year} />
          </div>

          {/**Ekip */}
          <ListField label="Ekip :" arr={data.cast} />

          {/**Tür*/}
          <ListField label="Kategoriler :" arr={data.genre} />
        </div>
      </div>
    </div>
  );
};

export default Detail;

const Field = ({ label, value }) => {
  return (
    <p>
      <span className="font-semibold me-3">{label}: </span>
      <span className="p-2 rounded-full  font-semibold bg-gray-200">
        {value}
      </span>
    </p>
  );
};
