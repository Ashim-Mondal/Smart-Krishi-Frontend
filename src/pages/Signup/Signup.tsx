import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import Button from "../../components/ui/Button";

const schema = z
  .object({
    fullName: z.string().min(2, "Enter your name"),
    phone: z.string().min(10, "Enter a valid mobile number"),
    businessName: z.string().optional(),
    village: z.string().min(1, "Select village"),
    block: z.string().min(1, "Select block"),
    district: z.string().min(1, "Select district"),
    role: z.enum(["farmer", "wholesaler"]),
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type FormValues = z.infer<typeof schema>;

export default function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { role: "farmer", block: "Pandua Block", district: "Hooghly, West Bengal" },
  });
  const role = watch("role");

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    navigate("/login");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-primary-light/50 to-bg flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="flex flex-col items-center mb-6">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white mb-2">
            <Leaf size={20} />
          </span>
          <h1 className="text-xl font-extrabold text-ink">KrishiBlock</h1>
          <p className="text-xs text-muted">Pandua Block</p>
        </div>

        <div className="card p-6 sm:p-8">
          <h2 className="text-lg font-bold text-ink mb-5">Create Account</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label-field">Full Name</label>
              <input {...register("fullName")} placeholder="Enter your name" className="input-field" />
              {errors.fullName && <p className="text-xs text-danger mt-1">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="label-field">Mobile Number</label>
              <input {...register("phone")} placeholder="Enter mobile number" className="input-field" />
              {errors.phone && <p className="text-xs text-danger mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="label-field">Business Name</label>
              <input {...register("businessName")} placeholder="Enter business name" className="input-field" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field">Village</label>
                <select {...register("village")} className="input-field">
                  <option value="">Select village</option>
                  <option value="Pandua">Pandua</option>
                  <option value="Dadpur">Dadpur</option>
                  <option value="Simla">Simla</option>
                </select>
                {errors.village && <p className="text-xs text-danger mt-1">{errors.village.message}</p>}
              </div>
              <div>
                <label className="label-field">Block</label>
                <input {...register("block")} className="input-field" />
              </div>
            </div>

            <div>
              <label className="label-field">District</label>
              <input {...register("district")} className="input-field" />
            </div>

            <div>
              <label className="label-field">User Type</label>
              <div className="flex items-center gap-6 mt-1">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    checked={role === "farmer"}
                    onChange={() => setValue("role", "farmer")}
                    className="accent-primary"
                  />
                  Farmer
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    checked={role === "wholesaler"}
                    onChange={() => setValue("role", "wholesaler")}
                    className="accent-primary"
                  />
                  Wholesaler
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field">Password</label>
                <input type="password" {...register("password")} className="input-field" />
                {errors.password && <p className="text-xs text-danger mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <label className="label-field">Confirm Password</label>
                <input type="password" {...register("confirmPassword")} className="input-field" />
                {errors.confirmPassword && (
                  <p className="text-xs text-danger mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <Button type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:text-primary-dark">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
