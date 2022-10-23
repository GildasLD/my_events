import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import noImage from "../assets/No_image_available.svg"; // Tell webpack this JS file uses this image

const Event = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const res = await axios.get(
        `https://public.opendatasoft.com/api/v2/catalog/datasets/evenements-publics-openagenda/records/${id}`
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
        <>
          {data.title_fr && <h2>{data.title_fr}</h2>}
          <img
            className="img--small"
            src={data.image ? data.image : noImage}
            alt="Img"
          />
          {data.longdescription_fr && (
            <>
              <div
                dangerouslySetInnerHTML={{ __html: data.longdescription_fr }}
              />
            </>
          )}
        </>
      </article>
    </>
  );
};
export default Event;
