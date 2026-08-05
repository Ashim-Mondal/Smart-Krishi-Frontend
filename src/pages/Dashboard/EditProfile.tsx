import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera } from "lucide-react";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import { useAppContext } from "../../context/AppContext";

const schema = z.object({
  businessName: z.string().min(2, "Required"),
  ownerName: z.string().min(2, "Required"),
  phone: z.string().min(10, "Enter a valid number"),
  whatsapp: z.string().min(10, "Enter a valid number"),
  village: z.string().min(1, "Required"),
  block: z.string().min(1, "Required"),
  district: z.string().min(1, "Required"),
  mapsUrl: z.string().optional(),
  about: z.string().max(400).optional(),
  openTime: z.string().min(1, "Required"),
  closeTime: z.string().min(1, "Required"),
});
type FormValues = z.infer<typeof schema>;

interface EditProfileProps {
  open: boolean;
  onClose: () => void;
}

export default function EditProfile({ open, onClose }: EditProfileProps) {
  const { profile, updateProfile } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: {
      businessName: profile.businessName,
      ownerName: profile.ownerName,
      phone: profile.phone,
      whatsapp: profile.whatsapp,
      village: profile.village,
      block: profile.block,
      district: profile.district,
      mapsUrl: profile.mapsUrl,
      about: profile.about,
      openTime: profile.businessHours.openTime,
      closeTime: profile.businessHours.closeTime,
    },
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 400));
    updateProfile({
      businessName: data.businessName,
      ownerName: data.ownerName,
      phone: data.phone,
      whatsapp: data.whatsapp,
      village: data.village,
      block: data.block,
      district: data.district,
      mapsUrl: data.mapsUrl,
      about: data.about,
      businessHours: { ...profile.businessHours, openTime: data.openTime, closeTime: data.closeTime },
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Profile" variant="panel">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0"
            style={{ backgroundColor: profile.logoColor }}
          >
            {profile.businessName.slice(0, 2).toUpperCase()}
          </div>
          <Button type="button" variant="outline" size="sm" icon={<Camera size={14} />}>
            Change Photo
          </Button>
        </div>

        <div>
          <h3 className="text-sm font-bold text-ink mb-3">Profile Information</h3>
          <div className="space-y-3">
            <div>
              <label className="label-field">Business Name</label>
              <input {...register("businessName")} className="input-field" />
              {errors.businessName && <p className="text-xs text-danger mt-1">{errors.businessName.message}</p>}
            </div>
            <div>
              <label className="label-field">Owner Name</label>
              <input {...register("ownerName")} className="input-field" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-field">Mobile Number</label>
                <input {...register("phone")} className="input-field" />
              </div>
              <div>
                <label className="label-field">WhatsApp Number</label>
                <input {...register("whatsapp")} className="input-field" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-field">Village</label>
                <input {...register("village")} className="input-field" />
              </div>
              <div>
                <label className="label-field">District</label>
                <input {...register("district")} className="input-field" />
              </div>
            </div>
            <div>
              <label className="label-field">Google Maps Link</label>
              <input {...register("mapsUrl")} className="input-field" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-ink mb-3">Business Details</h3>
          <div className="space-y-3">
            <div>
              <label className="label-field">Business Description</label>
              <textarea {...register("about")} rows={4} className="input-field resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-field">Opening Time</label>
                <input {...register("openTime")} className="input-field" placeholder="09:00 AM" />
              </div>
              <div>
                <label className="label-field">Closing Time</label>
                <input {...register("closeTime")} className="input-field" placeholder="07:00 PM" />
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Modal>
  );
}
