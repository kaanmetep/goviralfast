import { Suspense } from "react";
import LoginPopupContent from "./LoginPopupContent";

const LoginPopup = () => {
  return (
    <Suspense>
      <LoginPopupContent />
    </Suspense>
  );
};

export default LoginPopup;
