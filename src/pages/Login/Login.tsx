import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import Button from "../../components/ui/Button";
import api from "../../services/api";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Send email and password to Spring Boot
      const response = await api.post("/users/login", {
        email: data.email,
        password: data.password,
      });

      console.log("Login successful:", response.data);

      // Store logged-in user information
      localStorage.setItem(
        "kb_user",
        JSON.stringify(response.data)
      );

      alert("Login successful!");

      // Go to dashboard
      navigate("/dashboard");

    } catch (error: any) {
      console.error("Login error:", error);

      if (error.response?.data) {
        alert(
          typeof error.response.data === "string"
            ? error.response.data
            : "Invalid email or password"
        );
      } else {
        alert(
          "Cannot connect to server. Make sure Spring Boot is running."
        );
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-primary-light/50 to-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="flex flex-col items-center mb-6">

          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white mb-2">
            <Leaf size={20} />
          </span>

          <h1 className="text-xl font-extrabold text-ink">
            KrishiBlock
          </h1>

          <p className="text-xs text-muted">
            Pandua Block
          </p>

        </div>

        <div className="card p-6 sm:p-8">

          <h2 className="text-lg font-bold text-ink mb-5">
            Login
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >

            {/* Email */}
            <div>
              <label className="label-field">
                Email
              </label>

              <input
                type="email"
                {...register("email")}
                placeholder="Enter email address"
                className="input-field"
              />

              {errors.email && (
                <p className="text-xs text-danger mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>

              <label className="label-field">
                Password
              </label>

              <input
                type="password"
                {...register("password")}
                placeholder="Enter password"
                className="input-field"
              />

              {errors.password && (
                <p className="text-xs text-danger mt-1">
                  {errors.password.message}
                </p>
              )}

              <div className="text-right mt-1.5">
                <button
                  type="button"
                  className="text-xs font-semibold text-primary hover:text-primary-dark"
                >
                  Forgot Password?
                </button>
              </div>

            </div>

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Logging in..."
                : "Login"}
            </Button>

          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="h-px bg-border flex-1" />

            <span className="text-xs text-muted">
              or continue with
            </span>

            <div className="h-px bg-border flex-1" />
          </div>

          <Button variant="outline" fullWidth>
            <img
              src="https://www.google.com/favicon.ico"
              alt=""
              className="w-4 h-4"
              onError={(e) =>
                (e.currentTarget.style.display = "none")
              }
            />

            Continue with Google
          </Button>

          <p className="text-center text-sm text-muted mt-6">
            Don't have an account?{" "}

            <Link
              to="/signup"
              className="text-primary font-semibold hover:text-primary-dark"
            >
              Sign up
            </Link>

          </p>

        </div>
      </div>
    </div>
  );
}