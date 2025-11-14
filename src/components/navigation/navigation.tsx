import { useEffect } from "react";
import { useNavigate } from "react-router";
import { setNavigate } from "../../utils/navigate";

export const NavigationInitializer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return null;
};
