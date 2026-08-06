import { BadgeCheck, Star, Phone, MessageCircle, MapPin, Clock, Pencil } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { useDisclosure } from "../../hooks/useDisclosure";
import Button from "../../components/ui/Button";
import EditProfile from "./EditProfile";

export default function MyProfile() {
  const { profile: w } = useAppContext();
  const editPanel = useDisclosure();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-extrabold text-ink">My Profile</h1>
        <Button variant="outline" size="sm" icon={<Pencil size={14} />} onClick={editPanel.open}>
          Edit Profile
        </Button>
      </div>

      <div className="card p-6 flex flex-col sm:flex-row gap-5">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-extrabold text-xs text-center leading-tight shrink-0 whitespace-pre-line"
          style={{ backgroundColor: w.logoColor }}
        >
          {w.name.toUpperCase()}
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-extrabold text-ink">{w.name}</h2>
          {w.verified && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary-light rounded-full px-2.5 py-1 mt-1.5">
              <BadgeCheck size={13} /> Verified Wholesaler
            </span>
          )}
          {/* <div className="flex items-center gap-1.5 mt-2 text-sm">
            <Star size={14} className="fill-warning text-warning" />
            <span className="font-semibold text-ink">{w.rating}</span>
            <span className="text-muted">({w.reviews} Reviews)</span>
          </div> */}
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 mt-4 text-sm">
            <p><span className="text-muted">Owner: </span><span className="font-medium text-ink">{w.name}</span></p>
            {/* <p><span className="text-muted">Experience: </span><span className="font-medium text-ink">{w.experience} Years</span></p> */}
            <p className="flex items-center gap-1.5"><Phone size={13} className="text-primary" /> {w.phone}</p>
            {/* <p className="flex items-center gap-1.5"><MessageCircle size={13} className="text-primary" /> {w.whatsapp}</p> */}
            <p className="flex items-center gap-1.5"><MapPin size={13} className="text-primary" /> {w.block}, {w.village}</p>
            {/* <p className="flex items-center gap-1.5"><Clock size={13} className="text-primary" /> {w.businessHours.openTime} - {w.businessHours.closeTime}</p> */}
          </div>
        </div>
      </div>

      <div className="card p-6 mt-6">
        <h3 className="font-bold text-ink mb-2">About</h3>
        <p className="text-sm text-muted leading-relaxed">{w.about}</p>
      </div>

      <EditProfile open={editPanel.isOpen} onClose={editPanel.close} />
    </div>
  );
}
