import React, { useState } from "react";
import hamburger from "../shared/mobile/icon-hamburger.svg";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import backgroundHeaderMobile from "../suggestions/mobile/background-header.png";
import { Button } from "../ui/button";
import Image from "next/image";
import { DataItem } from "@/types";
import RoadmapBox from "./RoadmapBox";

interface SidebarProps {
  data: DataItem[];
  filterByCategory: (category: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ data, filterByCategory }) => {
  const categories = Array.from(
    new Set(data.map((item: DataItem) => item.category))
  );

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category);
    filterByCategory(category);
  };

  return (
    <div className="w-full sm:hidden py-6 bg-gradient-to-br from-blue-500 to-pink-400">
      <Sheet>
        <SheetTrigger className="ml-auto px-5 text-white flex items-center">
          <Image src={hamburger} alt="desktop bg" />
        </SheetTrigger>
        <SheetContent className="bg-white p-0 text-white">
          <div className="relative">
            <Image
              src={backgroundHeaderMobile}
              className=" w-full"
              alt="desktop bg"
            />
            <div className="absolute inset-0 flex flex-col justify-center p-4">
              <h1 className="text-primary sm:text-xl font-bold ">Eqaim</h1>
              <h2 className="text-secondary sm:text-lg opacity-80">
                Feedback Board
              </h2>
            </div>
          </div>
          <SheetHeader className="h-full bg-secondary shadow-md shadow-slate-200">
            <div className=" mx-1 my-2 bg-primary text-white rounded-3xl p-6 ">
              <Button
                className={`bg-darker-blue m-1 rounded-xl text-sm ${activeCategory === null ? 'border-none' : ''}`}
                variant="outline"
                onClick={() => handleCategoryClick(null)}
              >
                Show All
              </Button>
              {categories.map((category, index) => (
                <Button
                  key={index}
                  className={`bg-${activeCategory === category ? 'darker-blue text-white' : 'white text-darker-blue'} m-1 rounded-xl text-sm ${
                    index === 0 ? "border-none" : ""
                  }`}
                  variant="outline"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <RoadmapBox/>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;
