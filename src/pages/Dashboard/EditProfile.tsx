import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import api from "../../services/api";

const schema = z.object({
  name: z.string().min(2, "Name is required"),

  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(10, "Enter a valid phone number"),

  email: z.string().email("Enter a valid email"),

  role: z.enum(["farmer", "wholesaler"]),
});

type FormValues = z.infer<typeof schema>;

interface Block {
  id: number;
  blockName: string;
}

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  password?: string;
  role: string;
  block: Block | null;
}

interface EditProfileProps {
  open: boolean;
  onClose: () => void;
}

export default function EditProfile({
  open,
  onClose,
}: EditProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<string>("");
  const [serverError, setServerError] = useState("");

  // Get logged-in user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("kb_user");

    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);

        setUser(parsedUser);

        if (parsedUser.block) {
          setSelectedBlock(parsedUser.block.id.toString());
        }
      } catch (error) {
        console.error("Error reading user:", error);
      }
    }
  }, [open]);

  // Load blocks from backend
  useEffect(() => {
    if (open) {
      api
        .get("/block/all")
        .then((response) => {
          setBlocks(response.data);
        })
        .catch((error) => {
          console.error("Error loading blocks:", error);
        });
    }
  }, [open]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  // Put existing user data into form
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        phone: user.phone,
        email: user.email,
        role:
          user.role === "wholesaler"
            ? "wholesaler"
            : "farmer",
      });

      if (user.block) {
        setSelectedBlock(user.block.id.toString());
      }
    }
  }, [user, reset]);

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      setServerError("User not logged in");
      return;
    }

    try {
      setServerError("");

      // Find selected block
      const block = blocks.find(
        (b) => b.id.toString() === selectedBlock
      );

      if (!block) {
        setServerError("Please select a valid block");
        return;
      }

      // Data sent to Spring Boot
      const updatedUser = {
        id: user.id,
        name: data.name,
        phone: data.phone,
        email: data.email,
        role: data.role,
        password: user.password,
        block: {
          id: block.id,
        },
      };

      console.log("Updating user:", updatedUser);

      // PUT request
      const response = await api.put(
        `/users/update/${user.id}`,
        updatedUser
      );

      console.log("Updated user response:", response.data);

      // Save updated user to localStorage
      localStorage.setItem(
        "kb_user",
        JSON.stringify(response.data)
      );

      // Update local state
      setUser(response.data);

      alert("Profile updated successfully!");

      onClose();

      // Refresh page so Sidebar/Profile immediately show changes
      window.location.reload();

    } catch (error: any) {
      console.error("Update profile error:", error);

      if (error.response?.data) {
        setServerError(
          typeof error.response.data === "string"
            ? error.response.data
            : "Failed to update profile"
        );
      } else {
        setServerError(
          "Cannot connect to server. Make sure Spring Boot is running."
        );
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Edit Profile"
      variant="panel"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        {/* Profile Information */}
        <div>
          <h3 className="text-sm font-bold text-ink mb-3">
            Profile Information
          </h3>

          <div className="space-y-4">

            {/* Name */}
            <div>
              <label className="label-field">
                Name
              </label>

              <input
                {...register("name")}
                className="input-field"
                placeholder="Enter your name"
              />

              {errors.name && (
                <p className="text-xs text-danger mt-1">
                  {errors.name.message}
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
                className="input-field"
                placeholder="Enter mobile number"
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
                className="input-field"
                placeholder="Enter email"
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
                value={selectedBlock}
                onChange={(e) =>
                  setSelectedBlock(e.target.value)
                }
                className="input-field"
              >
                <option value="">
                  Select Block
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
            </div>

            {/* Role */}
            <div>
              <label className="label-field">
                User Type
              </label>

              <select
                {...register("role")}
                className="input-field"
              >
                <option value="farmer">
                  Farmer
                </option>

                <option value="wholesaler">
                  Wholesaler
                </option>
              </select>

              {errors.role && (
                <p className="text-xs text-danger mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

          </div>
        </div>

        {/* Server Error */}
        {serverError && (
          <p className="text-sm text-danger">
            {serverError}
          </p>
        )}

        {/* Save */}
        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : "Save Changes"}
        </Button>

      </form>
    </Modal>
  );
}