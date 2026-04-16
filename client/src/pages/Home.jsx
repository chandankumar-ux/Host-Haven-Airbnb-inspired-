import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Intro from "../components/Intro";
import Popular from "../components/Popular";

export default function Home() {
  const popularRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === "popular") {
      popularRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [location]);

  return (
    <main>
      <Intro />
      <Popular ref={popularRef} />
    </main>
  );
}
