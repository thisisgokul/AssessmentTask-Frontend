// ButtonFilter.tsx
import React from "react";
import { Button } from "../ui/button";

interface ButtonFilterProps {
  category: string;
  filterByCategory: (category: string | null) => void;
}

const ButtonFilter: React.FC<ButtonFilterProps> = ({ category, filterByCategory }) => {
  return (
    <Button
      key={category}
      className="text-darker-blue bg-secondary m-1 p-2 rounded-xl lg:text-lg md:text-xs"
      variant="outline"
      onClick={() => filterByCategory(category)}
    >
      {category}
    </Button>
  );
};

export default ButtonFilter;
