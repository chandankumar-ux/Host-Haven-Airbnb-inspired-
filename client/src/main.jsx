import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { useEffect } from "react";

import store from "./app/store.js";
import router from "./routes/router";
import { checkAuth } from "./app/features/authSlice";
import "./index.css";
import "./utils/fixLeafletIcon";


// 🔥 AuthInitializer component
function AuthInitializer({ children }) {
  useEffect(() => {
    store.dispatch(checkAuth()); // 👈 VERY IMPORTANT
  }, []);

  return children;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthInitializer>
      <RouterProvider router={router} />
    </AuthInitializer>
  </Provider>
);
