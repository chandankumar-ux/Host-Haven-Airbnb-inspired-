import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

import HostForm from "../components/HostForm";
import HostInput from "../components/HostInput";
import HostSelect from "../components/HostSelect";
import HostCheckboxGroup from "../components/HostCheckboxGroup";
import HostFileInput from "../components/HostFileInput";
import Loader from "../../components/Loader";

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);

  // 🔹 Load existing listing
  useEffect(() => {
    const loadListing = async () => {
      const { data } = await api.get(`/host/listings/${id}`);
      console.log("Previos data--",data);
      setListing(data);
      setLoading(false);
    };
    loadListing();
  }, [id]);
  if(!listing){
    return <Loader text="Loading..."/>
  }
    // console.log("Listing name--",listing.name);
  const onSubmit = async (data) => {
    const formData = new FormData();

    // text / number fields
    Object.keys(data).forEach((key) => {
      if (
        !key.includes("Images") &&
        key !== "lat" &&
        key !== "long"
      ) {
        if (Array.isArray(data[key])) {
          data[key].forEach((v) => formData.append(key, v));
        } else if (data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      }
    });

    // coordinates (REQUIRED)
    formData.append("coordinates[lat]", data.lat);
    formData.append("coordinates[long]", data.long);

    // image categories (optional)
    [
      "bedroomImages",
      "bathroomImages",
      "kitchenImages",
      "exteriorImages",
      "otherImages",
    ].forEach((field) => {
      if (data[field]?.length) {
        Array.from(data[field]).forEach((file) =>
          formData.append(field, file)
        );
      }
    });

    const res=await api.put(`/host/listings/${id}`, formData);
    console.log("updating post res--",res);
    navigate("/host/listings");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <HostForm title="Edit Listing" onSubmit={onSubmit} defaultValues={{
      name: listing.name,
      category: listing.category,
      location: listing.location,
      pricePerNight: listing.pricePerNight,
      maxGuests: listing.maxGuests,
      bedrooms: listing.bedrooms,
      baths: listing.baths,
      amenities: listing.amenities,
      description: listing.description,
      houseRules: listing.houseRules,
      lat: listing.coordinates?.lat,
      long: listing.coordinates?.long,
    }}>
      {({ register, errors }) => (
        <>
          {/* BASIC INFO */}
          <HostInput label="Property Name" name="name" register={register} required />
          <HostSelect
            label="Category"
            name="category"
            options={["Villa", "Apartment", "Cottage"]}
            register={register}
          />
          <HostInput label="Location" name="location" register={register} required />

          {/* PRICE & DETAILS */}
          <div className="grid grid-cols-2 gap-4">
            <HostInput
              label="Price per Night (₹)"
              name="pricePerNight"
              type="number"
              register={register}
              required
            />
            <HostInput
              label="Max Guests"
              name="maxGuests"
              type="number"
              register={register}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <HostInput label="Bedrooms" name="bedrooms" type="number" register={register} />
            <HostInput label="Bathrooms" name="baths" type="number" register={register} />
          </div>

          {/* COORDINATES */}
          <div className="grid grid-cols-2 gap-4">
            <HostInput label="Latitude" name="lat" type="number" step="any" register={register} required />
            <HostInput label="Longitude" name="long" type="number" step="any" register={register} required />
          </div>

          {/* AMENITIES */}
          <HostCheckboxGroup
            label="Amenities"
            name="amenities"
            options={["WiFi", "AC", "Parking", "Kitchen", "TV"]}
            register={register}
          />

          {/* EXISTING IMAGES PREVIEW */}
          <h2 className="text-lg font-semibold">Current Photos</h2>

          {Object.entries(listing.images).map(([key, imgs]) => (
            <div key={key}>
              <p className="font-medium capitalize">{key}</p>
              <div className="flex gap-2 flex-wrap">
                {imgs.map((img) => (
                  <img
                    key={img}
                    src={img}
                    alt=""
                    className="w-24 h-24 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          ))}

          {/* OPTIONAL IMAGE RE-UPLOAD */}
          <h2 className="text-lg font-semibold mt-4">Update Photos (Optional)</h2>

          <HostFileInput label="Bedroom Photos" name="bedroomImages" register={register} />
          <HostFileInput label="Bathroom Photos" name="bathroomImages" register={register} />
          <HostFileInput label="Kitchen Photos" name="kitchenImages" register={register} />
          <HostFileInput label="Exterior Photos" name="exteriorImages" register={register} />
          <HostFileInput label="Other Photos" name="otherImages" register={register} />

          {/* DESCRIPTION */}
          <div>
            <label className="font-medium">Description</label>
            <textarea
              {...register("description")}
              className="w-full border rounded p-2"
              rows={4}
            />
          </div>

          <div>
            <label className="font-medium">House Rules</label>
            <textarea
              {...register("houseRules")}
              className="w-full border rounded p-2"
              rows={3}
            />
          </div>
        </>
      )}
    </HostForm>
  );
}
