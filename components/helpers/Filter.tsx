import React from "react";
import suggestionicon from "../suggestions/icon-suggestions.svg";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface FilterProps {
  sortData: (
    criteria:
      | "most-upvotes"
      | "least-upvotes"
      | "most-comments"
      | "least-comments"
  ) => void;
  sortBy: "most-upvotes" | "least-upvotes" | "most-comments" | "least-comments";
  cardCount: number;
  filteredCount: number;
}

const Filter: React.FC<FilterProps> = ({
  sortData,
  sortBy,
  cardCount,
  filteredCount,
}) => {
  return (
    <div className="bg-darker-gray flex justify-between px-2 sm:px-4 items-center sm:rounded-xl py-2 sm:py-4">
      <div className="flex justify-between items-center gap-3 sm:gap-6">
        <Image
          src={suggestionicon}
          alt="suggestion icon"
          className="sm:block hidden"
        />
        <h3 className="sm:block hidden text-primary font-bold text-xs md:text-xs lg:text-xl">
          {cardCount} Suggestions
        </h3>

        <span className="text-medium-white text-xs sm:text-sm lg:text-base font-light">
          Sort by:
        </span>
        <select
          className=" bg-darker-gray border-none opacity-90 font-semibold text-primary text-xs sm:text-sm lg:text-lg rounded-md"
          value={sortBy}
          onChange={(e) =>
            sortData(
              e.target.value as
                | "most-upvotes"
                | "least-upvotes"
                | "most-comments"
                | "least-comments"
            )
          }
        >
          <option value="most-upvotes">Most upvotes</option>
          <option value="least-upvotes">Least upvotes</option>
          <option value="most-comments">Most comments</option>
          <option value="least-comments">Least comments</option>
        </select>
      </div>
      <Link href={"/add-feedback"}><Button className="bg-darker-violet hover:opacity-90 hover:bg-darker-violet text-primary text-sm sm:text-base lg:text-lg px-2 py-1 sm:px-3 sm:py-2 rounded-md">
        <span className="text-sm lg:text-xl font-bold">+</span> Add Feedback
      </Button></Link>
    </div>
  );
};

export default Filter;
