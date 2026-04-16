import { useEffect, useState } from "react";
import api from "../api/axios";
import Loader from "./Loader";

export default function HostInfo({ host }) {
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!host) return;

    const load = async () => {
      try {
        // ✅ host = userId
        const { data } = await api.get(`/auth/fetchUser/${host}`);
        setProvider(data.user || data);
      } catch (err) {
        console.error("Failed to load host info", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [host]); //  dependency added

  if (loading) {
    return <Loader text="Loading host..." />;
  }

  if (!provider) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 border-b pb-4">
      {/* Avatar */}
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-semibold overflow-hidden">
        {provider.profileImage ? (
          <img
            src={provider.profileImage}
            alt="Host"
            className="w-full h-full object-cover"
          />
        ) : (
          provider.firstName?.[0]?.toUpperCase() || "U"
        )}
      </div>

      {/* Info */}
      <div>
        <h3 className="font-semibold">
          Hosted by {provider.firstName} {provider.lastName}
        </h3>
        <p className="text-sm text-gray-500">
          Host since {new Date(provider.createdAt).getFullYear()}
        </p>
      </div>
    </div>
  );
}
