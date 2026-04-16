import {
  FaWifi,
  FaParking,
  FaTv,
  FaSnowflake,
  FaUtensils,
} from "react-icons/fa";

const ICONS = {
  WiFi: <FaWifi />,
  Parking: <FaParking />,
  TV: <FaTv />,
  AC: <FaSnowflake />,
  Kitchen: <FaUtensils />,
};

export default function Amenities({ amenities = [] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Amenities
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {amenities.map((a) => (
          <div
            key={a}
            className="flex items-center gap-3 text-gray-700"
          >
            <span className="text-lg text-indigo-600">
              {ICONS[a]}
            </span>
            <span>{a}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
