import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Card from "../components/Card";
import Loader from "../components/Loader";

export default function SearchResults() {
  const [params] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get(
        `/post/listings/search?${params.toString()}`
      );
      setListings(data);
      setLoading(false);
    };
    load();
  }, [params]);

  if (loading) return <Loader />;

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-xl font-semibold mb-4">
        Search Results
      </h2>

      {listings.length === 0 && (
        <p className="text-gray-500">No stays found</p>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((l) => (
          <Card
            key={l._id}
            id={l._id}
            img={l.images?.exterior?.[0]}
            title={l.name}
            address={l.location}
            price={l.pricePerNight}
          />
        ))}
      </div>
    </section>
  );
}
