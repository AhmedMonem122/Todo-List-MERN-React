import { useEffect } from "react";
import notFoundImage from "../../assets/images/404-Website-Page-Template.jpg";

const NotFound = () => {
  const setBackgroundImageToBody = () => {
    document.body.style.backgroundImage = `url(${notFoundImage})`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.height = "100vh";
    document.body.style.backgroundPosition = "center";
  };

  useEffect(() => {
    setBackgroundImageToBody();
  }, []);

  return null;
};

export default NotFound;
