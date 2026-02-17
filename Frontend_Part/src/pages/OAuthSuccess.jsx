import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function OAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const token = params.get("token");
    const userParam = params.get("user");

    if (token && userParam) {
      const user = JSON.parse(decodeURIComponent(userParam));

      login({ token, user });

      navigate("/dashboard");
    }
  }, []);

  return <p>Logging in...</p>;
}
