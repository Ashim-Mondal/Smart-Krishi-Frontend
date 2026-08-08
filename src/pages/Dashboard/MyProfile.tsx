import {
  BadgeCheck,
  Phone,
  Mail,
  MapPin,
  Pencil,
} from "lucide-react";

import { useEffect, useState } from "react";

import Button from "../../components/ui/Button";
import EditProfile from "./EditProfile";
import { useDisclosure } from "../../hooks/useDisclosure";

interface Block {
  id: number;
  blockName: string;
}

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  block: Block | null;
  createdAt?: string;
}

export default function MyProfile() {
  const editPanel = useDisclosure();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("kb_user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error reading user data:", error);
      }
    }
  }, []);

  // If user is not logged in
  if (!user) {
    return (
      <div className="card p-6 text-center">
        <h2 className="text-lg font-bold text-ink">
          User not logged in
        </h2>

        <p className="text-sm text-muted mt-2">
          Please login to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <h1 className="text-xl font-extrabold text-ink">
          My Profile
        </h1>

        <Button
          variant="outline"
          size="sm"
          icon={<Pencil size={14} />}
          onClick={editPanel.open}
        >
          Edit Profile
        </Button>

      </div>


      {/* Profile Card */}
      <div className="card p-6 flex flex-col sm:flex-row gap-5">

        {/* User Avatar */}
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center
          bg-primary text-white font-extrabold text-xl shrink-0"
        >
          {user.name
            ? user.name.charAt(0).toUpperCase()
            : "U"}
        </div>


        {/* User Information */}
        <div className="flex-1">

          <h2 className="text-lg font-extrabold text-ink">
            {user.name}
          </h2>


          {/* Role */}
          <span
            className="inline-flex items-center gap-1
            text-xs font-semibold text-primary
            bg-primary-light rounded-full px-2.5 py-1 mt-1.5"
          >
            <BadgeCheck size={13} />

            {user.role === "farmer"
              ? "Farmer"
              : user.role === "wholesaler"
              ? "Verified Wholesaler"
              : user.role}
          </span>


          {/* Details */}
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mt-5 text-sm">

            {/* Phone */}
            <p className="flex items-center gap-1.5">
              <Phone
                size={14}
                className="text-primary"
              />

              <span className="text-ink">
                {user.phone}
              </span>
            </p>


            {/* Email */}
            <p className="flex items-center gap-1.5">
              <Mail
                size={14}
                className="text-primary"
              />

              <span className="text-ink">
                {user.email}
              </span>
            </p>


            {/* Block */}
            <p className="flex items-center gap-1.5">
              <MapPin
                size={14}
                className="text-primary"
              />

              <span className="text-ink">
                {user.block?.blockName || "Block not assigned"}
              </span>
            </p>


            {/* Role */}
            <p>
              <span className="text-muted">
                Account Type:{" "}
              </span>

              <span className="font-medium text-ink capitalize">
                {user.role}
              </span>
            </p>

          </div>

        </div>

      </div>


      {/* About */}
      <div className="card p-6 mt-6">

        <h3 className="font-bold text-ink mb-2">
          About
        </h3>

        <p className="text-sm text-muted leading-relaxed">
          Welcome to SmartKrishi. Your profile information
          is connected with the SmartKrishi backend.
        </p>

      </div>


      {/* Edit Profile */}
      <EditProfile
        open={editPanel.isOpen}
        onClose={editPanel.close}
      />

    </div>
  );
}