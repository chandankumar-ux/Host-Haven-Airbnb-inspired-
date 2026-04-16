import { useEffect, useState, forwardRef } from "react";
import api from "../api/axios";
import Card from "./Card";
import Loader from "./Loader";

const Popular = forwardRef((props, ref) => {
  const [listings, setListings] = useState([]);

  const load = async () => {
    const { data } = await api.get("/post/listings");
    setListings(data);
  };

  useEffect(() => {
    load();
  }, []);

  if (!listings.length)
    return (
      <p className="text-center mt-10">
        <Loader />
      </p>
    );

  return (
    <section
      ref={ref}
      className="max-w-7xl mx-auto px-6 py-8 scroll-mt-32"
    >
      <h2 className="text-2xl font-semibold mb-6">
        Popular near you
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((l) => (
          <Card
            key={l._id}
            id={l._id}
            img={
              l.images?.exterior?.[0] ||
              l.images?.bedroom?.[0] ||
              "https://via.placeholder.com/400"
            }
            title={l.name}
            address={l.location}
            price={l.pricePerNight}
          />
        ))}
      </div>
    </section>
  );
});

export default Popular;
