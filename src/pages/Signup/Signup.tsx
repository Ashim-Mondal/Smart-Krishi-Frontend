import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import Button from "../../components/ui/Button";
import api from "../../services/api";

const schema = z
  .object({
    fullName: z.string().min(2, "Enter your name"),

    phone: z
      .string()
      .min(10, "Enter a valid mobile number")
      .max(10, "Enter a valid mobile number"),

    email: z.string().email("Enter a valid email"),

    role: z.enum(["farmer", "wholesaler"]),

    block: z.string().min(1, "Select block"),

    password: z.string().min(6, "Minimum 6 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

interface Block {
  id: number;
  blockName: string;
}

export default function Signup() {
  const navigate = useNavigate();

  const [blocks, setBlocks] = useState<Block[]>([]);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "farmer",
      block: "",
    },
  });

  const role = watch("role");

  // Load blocks from backend
  useEffect(() => {
    api
      .get("/block/all")
      .then((response) => {
        setBlocks(response.data);
      })
      .catch((error) => {
        console.error("Error loading blocks:", error);
      });
  }, []);

  const onSubmit = async (data: FormValues) => {
    try {
      setServerError("");

      // Find selected block
      const selectedBlock = blocks.find(
        (block) => block.id.toString() === data.block
      );

      if (!selectedBlock) {
        setServerError("Please select a valid block");
        return;
      }

      // Data sent to Spring Boot
      const userData = {
        name: data.fullName,
        phone: data.phone,
        email: data.email,
        role: data.role,
        password: data.password,
        block: {
          id: selectedBlock.id,
        },
      };

      console.log("Sending user data:", userData);

      const response = await api.post("/users/register", userData);

      console.log("Registration successful:", response.data);

      alert("Account created successfully!");

      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);

      if (error.response?.data) {
        setServerError(
          typeof error.response.data === "string"
            ? error.response.data
            : "Registration failed"
        );
      } else {
        setServerError(
          "Cannot connect to server. Make sure Spring Boot is running."
        );
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-primary-light/50 to-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">

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
            Create Account
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >

            {/* Full Name */}
            <div>
              <label className="label-field">
                Full Name
              </label>

              <input
                {...register("fullName")}
                placeholder="Enter your name"
                className="input-field"
              />

              {errors.fullName && (
                <p className="text-xs text-danger mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>


            {/* Phone */}
            <div>
              <label className="label-field">
                Mobile Number
              </label>

              <input
                {...register("phone")}
                placeholder="Enter mobile number"
                className="input-field"
              />

              {errors.phone && (
                <p className="text-xs text-danger mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>


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


            {/* Block */}
            <div>
              <label className="label-field">
                Block
              </label>

              <select
                {...register("block")}
                className="input-field"
              >
                <option value="">
                  Select block
                </option>

                {blocks.map((block) => (
                  <option
                    key={block.id}
                    value={block.id}
                  >
                    {block.blockName}
                  </option>
                ))}
              </select>

              {errors.block && (
                <p className="text-xs text-danger mt-1">
                  {errors.block.message}
                </p>
              )}
            </div>


            {/* User Type */}
            <div>
              <label className="label-field">
                User Type
              </label>

              <div className="flex items-center gap-6 mt-1">

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    checked={role === "farmer"}
                    onChange={() =>
                      setValue("role", "farmer")
                    }
                    className="accent-primary"
                  />

                  Farmer
                </label>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    checked={role === "wholesaler"}
                    onChange={() =>
                      setValue("role", "wholesaler")
                    }
                    className="accent-primary"
                  />

                  Wholesaler
                </label>

              </div>
            </div>


            {/* Password */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="label-field">
                  Password
                </label>

                <input
                  type="password"
                  {...register("password")}
                  className="input-field"
                />

                {errors.password && (
                  <p className="text-xs text-danger mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>


              {/* Confirm Password */}
              <div>
                <label className="label-field">
                  Confirm Password
                </label>

                <input
                  type="password"
                  {...register("confirmPassword")}
                  className="input-field"
                />

                {errors.confirmPassword && (
                  <p className="text-xs text-danger mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

            </div>


            {/* Backend error */}
            {serverError && (
              <p className="text-sm text-danger">
                {serverError}
              </p>
            )}


            {/* Submit */}
            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Creating account..."
                : "Create Account"}
            </Button>

          </form>


          <p className="text-center text-sm text-muted mt-6">
            Already have an account?{" "}

            <Link
              to="/login"
              className="text-primary font-semibold hover:text-primary-dark"
            >
              Login
            </Link>

          </p>

        </div>
      </div>
    </div>
  );
}