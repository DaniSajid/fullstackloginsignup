import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:5000/api/v1/user/verify-email?token=${token}`)
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          if (data.message === "Email successfully verified. You can now log in.") {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("Error verifying email:", error);
          alert("Email verification failed. Please try again.");
        });
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>Please wait while we verify your email...</p>
    </div>
  );
};

export default VerifyEmail;
