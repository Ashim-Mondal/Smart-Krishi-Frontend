import { BadgeCheck, Star } from "lucide-react";
import type { Wholesaler } from "../../types";
import { randomColorStyle } from "../../utils/cn";

type WholesalerWithProducts = Wholesaler & {
  products: any[];
};

export default function ProfileCard({
  wholesaler,
}: {
  wholesaler: WholesalerWithProducts;
}) {
  console.log(
    "Rendering ProfileCard for wholesaler:",
    wholesaler
  );

  

  return (
    <div className="card p-5">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-extrabold text-xs text-center leading-tight shrink-0"
          style={randomColorStyle}
        >
          {wholesaler.name?.toUpperCase()}
        </div>

        {/* Information */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-ink truncate">
              {wholesaler.name}
            </h3>

            {wholesaler.verified && (
              <BadgeCheck
                size={16}
                className="text-primary shrink-0"
              />
            )}
          </div>

          {/* Location */}
          <p className="text-xs text-muted mt-1">
            {wholesaler?.block?.blockName ?? "N/A"} Block
          </p>

          {/* Rating */}
          {/*
          <div className="flex items-center gap-1.5 mt-2 text-sm">
            <Star
              size={14}
              className="fill-warning text-warning"
            />

            <span className="font-semibold text-ink">
              {wholesaler.rating}
            </span>

            <span className="text-muted">
              ({wholesaler.reviews} Reviews)
            </span>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}