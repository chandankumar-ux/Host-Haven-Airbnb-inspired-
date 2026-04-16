import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

import HostForm from "../components/HostForm";
import HostInput from "../components/HostInput";
import HostSelect from "../components/HostSelect";
import HostCheckboxGroup from "../components/HostCheckboxGroup";
import HostFileInput from "../components/HostFileInput";

export default function CreateListing() {
  const navigate = useNavigate();

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
        } else {
          formData.append(key, data[key]);
        }
      }
    });

    // coordinates
   formData.append("coordinates[lat]", data.lat);
   formData.append("coordinates[long]", data.long);
   console.log("lat--",data.lat);
   console.log("lon--",data.long);

    // image categories
    [
      "bedroomImages",
      "bathroomImages",
      "kitchenImages",
      "exteriorImages",
      "otherImages",
    ].forEach((field) => {
      if (data[field]) {
        Array.from(data[field]).forEach((file) =>
          formData.append(field, file)
        );
      }
    });
    console.log("form data is--",formData);
    const res=await api.post("/host/listings", formData);
    console.log("result of create listing is---",res);
    navigate("/host/listings");
  };

  return (
    <HostForm title="Create New Listing" onSubmit={onSubmit}>
      {({ register, errors }) => (
        <>
          {/* BASIC INFO */}
          <HostInput
            label="Property Name"
            name="name"
            register={register}
            error={errors.name?.message}
            required
          />

          <HostSelect
            label="Category"
            name="category"
            options={["Villa", "Apartment", "Cottage"]}
            register={register}
            error={errors.category?.message}
          />

          <HostInput
            label="Location"
            name="location"
            register={register}
            error={errors.location?.message}
            required
          />

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
            <HostInput
              label="Bedrooms"
              name="bedrooms"
              type="number"
              register={register}
            />
            <HostInput
              label="Bathrooms"
              name="baths"
              type="number"
              register={register}
            />
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

          {/* IMAGES */}
          <h2 className="text-lg font-semibold">Property Photos</h2>

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
