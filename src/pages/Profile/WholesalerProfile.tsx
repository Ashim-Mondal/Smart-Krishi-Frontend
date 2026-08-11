import { Link, useParams } from "react-router-dom";

import { ArrowLeft, BadgeCheck, Phone, MessageCircle } from "lucide-react";

import Button from "../../components/ui/Button";
import { useAppContext } from "../../context/AppContext";
import { randomColorStyle } from "../../utils/cn";

export default function WholesalerProfile() {
  const { id } = useParams();

  const { wholesalers, marketPricesLoading, marketPricesError } =
    useAppContext();

  if (marketPricesLoading) {
    return <div>Loading wholesaler...</div>;
  }

  if (marketPricesError) {
    return <div>{marketPricesError}</div>;
  }

  // Find wholesaler from backend data
  const w = wholesalers.find((x) => String(x.id) === String(id));
  console.log("Wholesaler found:", w);
  if (!w) {
    return (
      <div className="card p-6">
        <p className="text-sm text-muted">Wholesaler not found.</p>

        <Link
          to="/wholesalers"
          className="inline-flex items-center gap-2 mt-4 text-primary font-semibold"
        >
          <ArrowLeft size={16} />
          Back to Wholesalers
        </Link>
      </div>
    );
  }

  return (
    <div className="container-app py-10">
      {/* Back to Wholesalers */}
      <Link
        to="/wholesalers"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-5"
      >
        <ArrowLeft size={16} />
        Back to Wholesalers
      </Link>

      {/* Share */}
      {/* 
      <Button
        variant="outline"
        icon={<Share2 size={15} />}
      >
        Share
      </Button>
      */}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 card p-6 flex flex-col sm:flex-row gap-5">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-white font-extrabold text-xs text-center leading-tight shrink-0 whitespace-pre-line"
            style={randomColorStyle}
          >
            {w.name.toUpperCase()}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-extrabold text-ink">{w.name}</h1>
            </div>

            {w.verified && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary-light rounded-full px-2.5 py-1 mt-1.5">
                <BadgeCheck size={13} />
                Verified Wholesaler
              </span>
            )}

            {/* Rating */}
            {/*
            <div className="flex items-center gap-1.5 mt-2 text-sm">
              <Star
                size={14}
                className="fill-warning text-warning"
              />
              <span className="font-semibold text-ink">
                {w.rating}
              </span>
              <span className="text-muted">
                ({w.reviews} Reviews)
              </span>
            </div>
            */}

            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 mt-4 text-sm">
              <p>
                <span className="text-muted">Owner: </span>

                <span className="font-medium text-ink">{w.name}</span>
              </p>

              {/* Experience */}
              {/*
              <p>
                <span className="text-muted">
                  Experience:{" "}
                </span>

                <span className="font-medium text-ink">
                  {w.experience} Years
                </span>
              </p>
              */}

              {/* Deals In */}
              {/*
              <p>
                <span className="text-muted">
                  Deals In:{" "}
                </span>

                <span className="font-medium text-ink">
                  {w.dealsIn.join(", ")}
                </span>
              </p>
              */}

              {/* <p>
                <span className="text-muted">Village: </span>

                <span className="font-medium text-ink">{w.village}</span>
              </p> */}

              <p>
                <span className="text-muted">Block: </span>

                <span className="font-medium text-ink">
                  {w.block?.blockName ?? "N/A"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Contact + hours */}
        <div className="space-y-6">
          <div className="card p-5">
            <h3 className="text-sm font-bold text-ink mb-3">Contact Details</h3>

            <div className="space-y-2.5 text-sm">
              <p className="flex items-center gap-2 text-ink">
                <Phone size={14} className="text-primary" />

                {w.phone}
              </p>

              {/* WhatsApp */}
              {/*
              <button className="flex items-center gap-2 text-ink hover:text-primary transition-colors">
                <MessageCircle
                  size={14}
                  className="text-primary"
                />
                Chat on WhatsApp
              </button>
              */}

              {/* Map */}
              {/*
              <a
                href={w.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-ink hover:text-primary transition-colors"
              >
                <MapPin
                  size={14}
                  className="text-primary"
                />
                View on Map
              </a>
              */}
            </div>
          </div>

          {/* Business Hours */}
          {/*
          <div className="card p-5">
            <h3 className="text-sm font-bold text-ink mb-3">
              Business Hours
            </h3>

            <p className="flex items-center gap-2 text-sm text-ink">
              <Clock
                size={14}
                className="text-primary"
              />

              {w.businessHours.openTime} -
              {w.businessHours.closeTime}
            </p>

            <p className="text-xs text-muted mt-1 ml-6">
              {w.businessHours.days}
            </p>
          </div>
          */}
        </div>
      </div>

      {/* Products table */}
      <div className="card p-6 mt-6">
        <h3 className="text-base font-bold text-ink mb-4">Products They Buy</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted border-b border-border">
                <th className="pb-2 font-medium">Product</th>

                <th className="pb-2 font-medium">Category</th>
                <th className="pb-2 font-medium">Available Quantity</th>

                <th className="pb-2 font-medium">Buying Price (1 Bag)</th>

                {/* <th className="pb-2 font-medium">Last Updated</th> */}
              </tr>
            </thead>

            <tbody>
              {w.products?.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  {/* <td className="py-2.5">
                    
                  </td> */}

                  <td className="py-2.5 flex items-center gap-2 font-medium text-ink">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <img
                        src={p.productImageId.imageUrl}
                        alt={p.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {p.productName}
                  </td>
                  <td className="py-2.5 text-ink">{p.category}</td>
                  <td className="py-2.5 text-ink">{p.quantity} Bags</td>

                  <td className="py-2.5 text-ink">
                    ₹ {p.dailyPrice?.wholesalePrice}
                  </td>

                  {/* <td className="py-2.5 text-muted">{p.lastUpdated}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* About */}
      <div className="card p-6 mt-6">
        <h3 className="text-base font-bold text-ink mb-2">About {w.name}</h3>

        <p className="text-sm text-muted leading-relaxed">{w.about}</p>

        <div className="flex flex-wrap gap-3 mt-5">
          <a href={`tel:${w.phone.replace(/\s/g, "")}`}>
            <Button icon={<Phone size={15} />}>Call Now</Button>
          </a>

          <a
            href={`https://wa.me/${w.phone.replace(/\s|\+/g, "")}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline" icon={<MessageCircle size={15} />}>
              WhatsApp
            </Button>
          </a>

          {/* Share */}
          {/*
          <Button
            variant="outline"
            icon={<Share2 size={15} />}
          >
            Share
          </Button>
          */}
        </div>
      </div>
    </div>
  );
}
