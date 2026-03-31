import { useLocation, useNavigate } from "react-router-dom";
import useUserRole from "../../Hooks/UserRoleCheck";

const Forbidden = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useUserRole();

  const from = location.state?.from;

  const handleGoBack = () => {
    // If user is admin → allow going back
    if (role === "admin" && from) {
      navigate(from);
    } else {
      // otherwise send to safe page
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2">Access Forbidden</h2>
      <p className="mb-6 text-gray-600">
        You don’t have permission to access this page.
      </p>

      <div className="flex gap-4">
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Go Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Forbidden;