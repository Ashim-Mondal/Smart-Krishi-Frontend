import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  BadgeCheck,
  Phone,
  MessageCircle,
  X,
  Lock,
} from "lucide-react";

import Button from "../../components/ui/Button";
import { useAppContext } from "../../context/AppContext";
import { randomColorStyle } from "../../utils/cn";

import { useState } from "react";

export default function WholesalerProfile() {
  const { id } = useParams();

  const {
    wholesalers,
    marketPricesLoading,
    marketPricesError,
  } = useAppContext();

  // -----------------------------------------
  // Contact payment state
  // -----------------------------------------

  const [showPayment, setShowPayment] = useState(false);

  const [contactAction, setContactAction] = useState<
    "call" | "whatsapp" | null
  >(null);

  // -----------------------------------------
  // Loading
  // -----------------------------------------

  if (marketPricesLoading) {
    return <div>Loading wholesaler...</div>;
  }

  // -----------------------------------------
  // Error
  // -----------------------------------------

  if (marketPricesError) {
    return <div>{marketPricesError}</div>;
  }

  // -----------------------------------------
  // Find wholesaler
  // -----------------------------------------

  const w = wholesalers.find(
    (x) => String(x.id) === String(id),
  );

  console.log("Wholesaler found:", w);

  if (!w) {
    return (
      <div className="card p-6">
        <p className="text-sm text-muted">
          Wholesaler not found.
        </p>

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

  // -----------------------------------------
  // Mask phone number
  // Example:
  // 9876543210 -> 987654XXXX
  // -----------------------------------------

  const maskedPhone =
    w.phone && w.phone.length >= 4
      ? `${w.phone.slice(0, -4)}XXXX`
      : "XXXX";

  // -----------------------------------------
  // Open ₹2 contact access
  // -----------------------------------------

  const openPayment = (
    action: "call" | "whatsapp",
  ) => {
    setContactAction(action);
    setShowPayment(true);
  };

  // -----------------------------------------
  // Payment action
  // -----------------------------------------
  // NOTE:
  // Currently this is only frontend flow.
  // Real payment gateway can be connected later.
  // -----------------------------------------

  const handlePayment = () => {
    setShowPayment(false);

    if (contactAction === "call") {
      window.location.href = `tel:${w.phone}`;
    }

    if (contactAction === "whatsapp") {
      window.open(
        `https://wa.me/${w.phone.replace(/\D/g, "")}`,
        "_blank",
      );
    }
  };

  return (
    <div className="container-app py-10">

      {/* ================= BACK TO WHOLESALERS ================= */}

      <Link
        to="/wholesalers"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-5"
      >
        <ArrowLeft size={16} />
        Back to Wholesalers
      </Link>

      {/* ================= SHARE ================= */}

      {/*
      <Button
        variant="outline"
        icon={<Share2 size={15} />}
      >
        Share
      </Button>
      */}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* ================= MAIN INFO ================= */}

        <div className="lg:col-span-2 card p-6 flex flex-col sm:flex-row gap-5">

          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-white font-extrabold text-xs text-center leading-tight shrink-0 whitespace-pre-line"
            style={randomColorStyle}
          >
            {w.name.toUpperCase()}
          </div>

          <div className="flex-1">

            <div className="flex items-center gap-2 flex-wrap">

              <h1 className="text-xl font-extrabold text-ink">
                {w.name}
              </h1>

            </div>

            {/* ================= VERIFIED ================= */}

            {w.verified && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary-light rounded-full px-2.5 py-1 mt-1.5">
                <BadgeCheck size={13} />
                Verified Wholesaler
              </span>
            )}

            {/* ================= RATING ================= */}

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

              {/* Owner */}

              <p>
                <span className="text-muted">
                  Owner:{" "}
                </span>

                <span className="font-medium text-ink">
                  {w.name}
                </span>
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

              {/* Village */}

              {/*
              <p>
                <span className="text-muted">
                  Village:{" "}
                </span>

                <span className="font-medium text-ink">
                  {w.village}
                </span>
              </p>
              */}

              {/* Block */}

              <p>
                <span className="text-muted">
                  Block:{" "}
                </span>

                <span className="font-medium text-ink">
                  {w.block?.blockName ?? "N/A"}
                </span>
              </p>

            </div>
          </div>
        </div>

        {/* ================= CONTACT + HOURS ================= */}

        <div className="space-y-6">

          {/* ================= CONTACT DETAILS ================= */}

          <div className="card p-5">

            <h3 className="text-sm font-bold text-ink mb-3">
              Contact Details
            </h3>

            <div className="space-y-2.5 text-sm">

              {/* Masked Phone */}

              <p className="flex items-center gap-2 text-ink">
                <Phone
                  size={14}
                  className="text-primary"
                />

                {maskedPhone}
              </p>

              {/* Hidden digits information */}

              <p className="text-xs text-muted flex items-center gap-1">
                <Lock size={12} />
                Last 4 digits are hidden
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

          {/* ================= BUSINESS HOURS ================= */}

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

      {/* ================= PRODUCTS TABLE ================= */}

      <div className="card p-6 mt-6">

        <h3 className="text-base font-bold text-ink mb-4">
          Products They Buy
        </h3>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>

              <tr className="text-left text-muted border-b border-border">

                <th className="pb-2 font-medium">
                  Product
                </th>

                <th className="pb-2 font-medium">
                  Category
                </th>

                <th className="pb-2 font-medium">
                  Available Quantity
                </th>

                <th className="pb-2 font-medium">
                  Buying Price (1 Bag)
                </th>

                {/*
                <th className="pb-2 font-medium">
                  Last Updated
                </th>
                */}

              </tr>

            </thead>

            <tbody>

              {w.products?.map((p) => (

                <tr
                  key={p.id}
                  className="border-b border-border last:border-0"
                >

                  <td className="py-2.5 flex items-center gap-2 font-medium text-ink">

                    <div className="w-10 h-10 rounded-lg overflow-hidden">

                      <img
                        src={p.productImageId?.imageUrl}
                        alt={p.productName}
                        className="w-full h-full object-cover"
                      />

                    </div>

                    {p.productName}

                  </td>

                  <td className="py-2.5 text-ink">
                    {p.category}
                  </td>

                  <td className="py-2.5 text-ink">
                    {p.quantity} Bags
                  </td>

                  <td className="py-2.5 text-ink">
                    ₹ {p.dailyPrice?.wholesalePrice}
                  </td>

                  {/*
                  <td className="py-2.5 text-muted">
                    {p.lastUpdated}
                  </td>
                  */}

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

      {/* ================= ABOUT ================= */}

      <div className="card p-6 mt-6">

        <h3 className="text-base font-bold text-ink mb-2">
          About {w.name}
        </h3>

        <p className="text-sm text-muted leading-relaxed">
          {w.about}
        </p>

        {/* ================= CONTACT BUTTONS ================= */}

        <div className="flex flex-wrap gap-3 mt-5">

          {/* Call */}

          <Button
            icon={<Phone size={15} />}
            onClick={() => openPayment("call")}
          >
            Call Now
          </Button>

          {/* WhatsApp */}

          <Button
            variant="outline"
            icon={<MessageCircle size={15} />}
            onClick={() => openPayment("whatsapp")}
          >
            WhatsApp
          </Button>

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

      {/* ===================================================== */}
      {/*                    ₹2 PAYMENT MODAL                  */}
      {/* ===================================================== */}

      {showPayment && (

        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl">

            {/* Close */}

            <button
              onClick={() => setShowPayment(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
              type="button"
            >
              <X size={18} />
            </button>

            {/* Header */}

            <div className="flex items-center gap-3 mb-5">

              <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">

                <Lock
                  size={22}
                  className="text-primary"
                />

              </div>

              <div>

                <h3 className="font-bold text-lg text-ink">
                  Unlock Contact
                </h3>

                <p className="text-sm text-muted">
                  View full contact details
                </p>

              </div>

            </div>

            {/* Payment Details */}

            <div className="bg-gray-50 rounded-xl p-4 mb-5">

              <p className="text-xs text-muted">
                Wholesaler
              </p>

              <p className="font-semibold text-ink mt-1">
                {w.name}
              </p>

              <div className="border-t border-border my-3" />

              <div className="flex items-center justify-between">

                <span className="text-sm text-muted">
                  Contact Access
                </span>

                <span className="font-bold text-primary">
                  ₹2
                </span>

              </div>

            </div>

            {/* Selected action */}

            <div className="mb-5">

              <p className="text-xs text-muted mb-1">
                After payment
              </p>

              <p className="text-sm font-medium text-ink">

                {contactAction === "call"
                  ? "You will be redirected to the phone call."
                  : "You will be redirected to WhatsApp."
                }

              </p>

            </div>

            {/* Pay */}

            <Button
              block
              onClick={handlePayment}
            >
              Pay ₹2
            </Button>

            {/* Cancel */}

            <div className="mt-2">

              <Button
                block
                variant="outline"
                onClick={() => setShowPayment(false)}
              >
                Cancel
              </Button>

            </div>

            <p className="text-[11px] text-muted text-center mt-4">
              Contact information is protected and can be
              accessed after payment.
            </p>

          </div>

        </div>

      )}

    </div>
  );
}