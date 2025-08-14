import React from "react";
import { Link } from "react-router";

export default function CardProduct({ thumbnail, title, id }) {
  return (
    <Link
      to={`/products/${id}`}
      className="group overflow-hidden rounded-lg bg-white text-slate-600 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <figure className="overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="aspect-video w-full h-[280px] object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </figure>

      {/* Card Body */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors duration-200">
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Click to view more details
        </p>
      </div>
    </Link>
  );
}
