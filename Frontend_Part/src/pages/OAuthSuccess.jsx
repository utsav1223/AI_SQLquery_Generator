import { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function OAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      return navigate("/login");
    }

    // Decode token to extract user info
    const payload = JSON.parse(atob(token.split(".")[1]));

    const user = {
      id: payload.userId,
      role: payload.role
    };

    login({ token, user });

    navigate("/dashboard");
  }, []);

  return <div>Logging you in...</div>;
}

