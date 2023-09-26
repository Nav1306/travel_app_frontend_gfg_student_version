import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FinalPrice,
  HotelDetails,
  HotelImages,
  Navbar,
} from "../../components";
import "./SingleHotel.css";

export const SingleHotel = () => {
  const { _id } = useParams();
  const [singleHotel, setSingleHotel] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://navtravelapp.cyclic.app/api/hotels/${_id}`
        );

        setSingleHotel(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [_id]);

  const { name, state } = singleHotel;

  return (
    <Fragment>
      <Navbar />
      <main className="single-hotel-page">
        <p className="hotel-name-add">
          {singleHotel && name && state && `${name}, ${state}`}
        </p>
        {singleHotel && <HotelImages singleHotel={singleHotel} />}
        <div>
          <div className="d-flex">
            <HotelDetails singleHotel={singleHotel} />
            <FinalPrice singleHotel={singleHotel}/>
          </div>
        </div>
      </main>
    </Fragment>
  );
};
