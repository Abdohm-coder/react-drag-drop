import { BarsArrowDownIcon, PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import Card from "./Card";
import { SortableContext } from "@dnd-kit/sortable";

const Column = ({
  id,
  title,
  barColor,
  addApplicants,
  rejected,
  total,
  candidates,
}) => {
  const getBarColor = (type) => {
    switch (type) {
      case "accent":
        return "bg-accent";
      case "success":
        return "bg-success";
      case "danger":
        return "bg-danger";
      default:
        return "bg-gray-500";
    }
  };
  return (
    <div className="max-w-[600px] rounded-2xl bg-background text-dark">
      <div className="flex flex-col gap-y-3 w-full p-5">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between w-full min-h-9 gap-y-2">
          <div className="flex items-center">
            <input
              id={`checked-checkbox-${title}`}
              type="checkbox"
              className="w-4 h-4 !text-primary !bg-primary !border-primary rounded focus:ring-none"
            />
            <label
              for={`checked-checkbox-${title}`}
              className="ms-2 text-sm font-semibold"
            >
              {title}
            </label>
          </div>
          {addApplicants && (
            <button
              title="Add Applicants"
              className="px-4 py-2 bg-secondary text-primary font-semibold text-sm rounded-xl flex items-center gap-x-1"
            >
              <PlusIcon className="w-4 h-4 " />
              <span>Add Applicants</span>
            </button>
          )}
          <button title="Sort">
            <BarsArrowDownIcon className="text-light w-6 h-6" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <span className="text-2xl font-semibold">{rejected}</span>
            <span className="uppercase text-light font-medium text-sm">
              Rejected
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-2xl font-semibold">{total}</span>
            <span className="uppercase text-light font-medium text-sm">
              Total
            </span>
          </div>
        </div>
        <div
          className={`w-full h-1.5 rounded-md ${getBarColor(barColor)}`}
        ></div>

        {/* Cards */}
        <SortableContext
          items={candidates}
          // strategy={verticalListSortingStrategy}
        >
          <div className=" flex flex-col gap-y-3 pt-3">
            {candidates.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
