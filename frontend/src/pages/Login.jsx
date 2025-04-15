import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user)
        localStorage.setItem("token", response.data.token);
        navigate("/home")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
    style={{
      backgroundImage: "url('https://plus.unsplash.com/premium_photo-1667754184973-b36396448a0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwNXx8fGVufDB8fHx8fA%3D%3D')",
    }}>
      <div className="bg-white p-10 rounded shadow-md">
        <h2 className="text-3xl font-semibold mb-2">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-3 py-2 border rounded"
              placeholder="********"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className=" w-full bg-teal-600  py-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-red-600">
                SignUp
              </Link>
              {""}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
