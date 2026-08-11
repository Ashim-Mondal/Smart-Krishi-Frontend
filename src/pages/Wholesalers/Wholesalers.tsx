import ProfileCard from "../../components/layout/ProfileCard";
import { Link } from "react-router-dom";
import SectionTitle from "../../components/ui/SectionTitle";
import { useAppContext } from "../../context/AppContext";

export default function Wholesalers() {
  const { wholesalers, marketPricesLoading, marketPricesError } =
    useAppContext();

  console.log("Wholesalers:", wholesalers);

  if (marketPricesLoading) {
    return <div>Loading wholesalers...</div>;
  }

  if (marketPricesError) {
    return <div>{marketPricesError}</div>;
  }

  return (
    <>
      <div className="container-app py-10">
        <SectionTitle title="Wholesalers" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wholesalers.map((w) => (
            <Link
              key={w.id}
              to={`/wholesalers/${w.id}`}
              className="block hover:-translate-y-0.5 transition-transform duration-200"
            >
              <ProfileCard wholesaler={w} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
