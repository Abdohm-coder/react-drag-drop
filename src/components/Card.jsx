import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChartBarIcon, StarIcon } from "@heroicons/react/16/solid";
import React from "react";

const Card = ({
  id,
  name,
  location,
  image,
  isNew,
  phone,
  rating,
  bar,
  isFollowed,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data: { type: "item" } });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const getBarColor = (type) => {
    switch (type) {
      case "red":
        return "fill-red-500";
      case "green":
        return "fill-green-500";
      case "yellow":
        return "fill-yellow-500";
      default:
        return "fill-gray-500";
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`w-full rounded-2xl p-3 flex gap-x-3 bg-white ${
        isDragging ? "opacity-40" : ""
      }`}
    >
      {/* Left Side */}
      <div className="flex flex-col gap-y-3">
        <img
          src={image}
          alt={name}
          loading="lazy"
          width={64}
          height={64}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div className="flex items-center justify-center p-1 rounded-xl bg-background gap-x-1">
          <span className="font-medium text-sm">{rating}</span>
          <StarIcon className="fill-yellow-400 w-5 h-5" />
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1 flex flex-col gap-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 w-full ">
          <div className="flex items-center gap-x-2">
            <ChartBarIcon className={`w-4 h-4 ${getBarColor(bar)}`} />
            <span className="font-semibold">{name}</span>
          </div>
          {isNew && (
            <div className="px-4 py-2 bg-secondary text-primary font-semibold text-sm rounded-xl">
              New
            </div>
          )}
        </div>
        <span className="text-light ">{location}</span>
        <div className="flex flex-wrap items-center gap-2 justify-between">
          <span className="text-light ">{phone}</span>
          {isFollowed && (
            <div className="px-4 py-2 bg-primary text-white font-semibold text-sm rounded-xl">
              Followed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
