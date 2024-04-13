import Image from "next/image";
import React from "react";
import arrowup from "@/app/assets/icons/icon-arrow-up.svg";
import Link from "next/link";

interface RoadmapItem {
  _id: number;
  title: string;
  description: string;
  category: string;
  upvotes: number;
}

const RoadmapCard: React.FC<{ item: RoadmapItem }> = ({ item }) => {
  return (
    <Link href={`single-page/${item._id}`}>
      <h2 className="sm:text-xl hover:underline text-sm font-bold text-darker-gray-medium">
        {item.title}
      </h2>

      <p className="text-slate-500 sm:text-base font-medium text-xs mt-2">
        {item.description}
      </p>
      <div className="flex justify-between mt-3">
        <button className="sm:p-2 p-1 text-sm sm:text-base bg-secondary rounded-xl mt-3 text-darker-blue">
          {item.category}
        </button>
        <div className="bg-secondary px-1 sm:px-3 sm:w-12 w-8 flex flex-col justify-center items-center p-2 rounded-xl">
          <Image src={arrowup} alt="up arrow icon" />
          <span className="sm:text-base font-bold text-darker-gray text-sm">
            {item.upvotes}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RoadmapCard;
