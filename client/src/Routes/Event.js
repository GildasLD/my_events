import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Event = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const res = await axios.get(
        `https://public.opendatasoft.com/api/v2/catalog/datasets/evenements-publics-cibul/records/${id}`
      );
      //   console.log(res.data.record.fields);
      setData(res.data.record.fields);
      // (res.data)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <article className="container">
        {data.title && <h2>{data.title}</h2>}
        <img
          className="img--small"
          src={
            data.image
              ? data.image
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
          }
          alt="Img"
        />
        {data.free_text && <p className=""> {data.free_text}</p>}
      </article>
    </>
  );
};
export default Event;
