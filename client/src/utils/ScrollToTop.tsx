// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Try scrolling the document itself
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE
    document.body.scrollTop = 0;             // For Safari

    // If your app scrolls inside a specific div (like className="App")
    const app = document.querySelector(".App");
    if (app) {
      app.scrollTop = 0;
    }

    // Optional: Debug scroll positions
    // console.log("ScrollTop triggered for", pathname + search);
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
