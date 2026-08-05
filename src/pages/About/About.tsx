import { Target, Sparkles, Store, MapPin, Mail, Phone } from "lucide-react";

const mission = [
  "To empower farmers by connecting them with trusted buyers and providing fair market information.",
];

const offer = [
  "Verified Wholesaler Directory",
  "Daily Market Price Updates",
  "Product-wise Buyer List",
  "Weather Updates",
  "Local Business Directory",
];

const forWholesalers = [
  "List your business, update daily requirements and connect with thousands of farmers in your block.",
];

export default function About() {
  return (
    <div className="pb-16">
      <div className="container-app pt-8">
        <div className="rounded-card overflow-hidden bg-gradient-to-br from-[#0B3D24] to-primary text-white p-8 sm:p-10 relative">
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-3">About KrishiBlock</h1>
          <p className="text-white/85 max-w-xl text-sm leading-relaxed">
            KrishiBlock is a digital platform that connects farmers with verified wholesalers in their block. Our
            mission is to bring transparency in agricultural trade by providing genuine wholesaler information,
            daily price updates and better market access for farmers.
          </p>
        </div>
      </div>

      <div className="container-app grid md:grid-cols-3 gap-6 mt-10">
        <div className="card p-6">
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary mb-3">
            <Target size={18} />
          </div>
          <h3 className="font-bold text-ink mb-2">Our Mission</h3>
          <p className="text-sm text-muted leading-relaxed">{mission[0]}</p>
        </div>

        <div className="card p-6">
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary mb-3">
            <Sparkles size={18} />
          </div>
          <h3 className="font-bold text-ink mb-2">What We Offer</h3>
          <ul className="space-y-1.5">
            {offer.map((item) => (
              <li key={item} className="text-sm text-muted flex items-start gap-2">
                <span className="text-primary mt-1">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-6">
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary mb-3">
            <Store size={18} />
          </div>
          <h3 className="font-bold text-ink mb-2">For Wholesalers</h3>
          <p className="text-sm text-muted leading-relaxed mb-4">{forWholesalers[0]}</p>
          <button className="btn-primary text-sm">List Your Business</button>
        </div>
      </div>

      <div className="container-app mt-10">
        <div className="card p-6 sm:p-8">
          <h3 className="font-bold text-ink mb-4">Contact Us</h3>
          <div className="flex flex-wrap gap-6 text-sm">
            <p className="flex items-center gap-2 text-ink"><MapPin size={15} className="text-primary" /> Pandua Block, Hooghly, West Bengal - 712149</p>
            <p className="flex items-center gap-2 text-ink"><Mail size={15} className="text-primary" /> support@krishiblock.in</p>
            <p className="flex items-center gap-2 text-ink"><Phone size={15} className="text-primary" /> +91 98765 43210</p>
          </div>
        </div>
      </div>
    </div>
  );
}
