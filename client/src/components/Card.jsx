import { NavLink } from "react-router-dom";

export default function Card({ event }) {
  return (
    <div className="container">
      <article className="card">
        <div className="">
          <img
            className="img"
            src={
              event.record.fields.image
                ? event.record.fields.image
                : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
            }
            alt="Img"
          />
        </div>
        <div className="card-body double">
          <b>{event.record.fields.title}</b>
          <p>{event.record.fields.description}</p>
          {/* {event.record.fields.free_text &&<p> {event.record.fields.free_text.length > 200 ?event.record.fields.free_text.substring(0,250).concat(' ...'): event.record.fields.free_text}</p>} */}
          <NavLink className=" btn " to={`event/${event.record.id}`}>
            En savoir +{" "}
          </NavLink>
        </div>
      </article>
    </div>
  );
}
