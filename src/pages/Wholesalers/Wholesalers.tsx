import ProfileCard from "../../components/layout/ProfileCard";
import { Link } from "react-router-dom";
import SectionTitle from "../../components/ui/SectionTitle";
import { wholesalers } from "../../data/mockData";

export default function Wholesalers() {
  return (
    <div className="container-app py-10">
      <SectionTitle title="Verified Wholesalers" />
      <div className="grid sm:grid-cols-2 gap-4">
        {wholesalers.map((w) => (
          <Link key={w.id} to={`/wholesalers/${w.id}`} className="block hover:-translate-y-0.5 transition-transform duration-200">
            <ProfileCard wholesaler={w} />
          </Link>
        ))}
      </div>
    </div>
  );
}
