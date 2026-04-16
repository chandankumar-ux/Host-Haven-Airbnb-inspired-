import { useSelector } from "react-redux";
import Loader from "../components/Loader";

export default function GlobalLoader({ children }) {
  const loading = useSelector((state) => state.auth.loading);
  if (loading) return <Loader text="Loading..." />;
  return children;
}
