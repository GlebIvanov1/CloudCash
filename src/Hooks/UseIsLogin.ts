import { useSelector } from "react-redux";

const useIsLogin = () => {
  const email = useSelector((state: any) => state.User.email);

  if (email) {
    return true;
  }

  return false;
};

export default useIsLogin;
