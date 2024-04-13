"use client";
import React, { useEffect, useState } from "react";
import backgroundHeaderDesktop from "../suggestions/desktop/background-header.png";
import backgroundHeaderTablet from "../suggestions/tablet/background-header.png";
import Image from "next/image";
import { Button } from "../ui/button";
import Sidebar from "../helpers/Sidebar";
import Card from "../helpers/Card";
import Filter from "../helpers/Filter";
import axiosInstance from "@/app/utils/axiosInstance";
import ButtonFilter from "../helpers/ButtonFilter";
import { DataItem } from "@/types/index";
import Link from "next/link";
import RoadmapBox from "../helpers/RoadmapBox";

const Hero: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [sortBy, setSortBy] = useState<
    "most-upvotes" | "least-upvotes" | "most-comments" | "least-comments"
  >("most-upvotes");
  const [filteredCount, setFilteredCount] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<DataItem[]>("/all-data");
        console.log(response.data);

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredCount(data.length);
  }, [data]);

  // Function to sort data based on selected criteria
  const sortData = (
    criteria:
      | "most-upvotes"
      | "least-upvotes"
      | "most-comments"
      | "least-comments"
  ) => {
    setSortBy(criteria);
    let sortedData = [...data];
    switch (criteria) {
      case "most-upvotes":
        sortedData.sort((a, b) => b.upvotes - a.upvotes);
        break;
      case "least-upvotes":
        sortedData.sort((a, b) => a.upvotes - b.upvotes);
        break;
      case "most-comments":
        sortedData.sort((a, b) => b.comments.length - a.comments.length);
        break;
      case "least-comments":
        sortedData.sort((a, b) => a.comments.length - b.comments.length);
        break;
      default:
        break;
    }
    setData(sortedData);
    setFilteredCount(sortedData.length);
  };

  // Function to filter data based on category
  const filterByCategory = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Sidebar data={data} filterByCategory={filterByCategory} />
      <div className="flex flex-wrap justify-center sm:pt-16 lg:padding-x  relative gap-4">
        <div className="w-full sm:w-1/5 mb-4 sm:mb-14 hidden sm:block relative">
          <Image
            src={backgroundHeaderDesktop}
            className="rounded-2xl w-full"
            alt="desktop bg"
          />
          
          <div className="absolute lg:top-5 top-0 left-0 flex flex-col p-4">
            <h1 className="text-primary lg:text-2xl md:text-base font-bold">
              Eqaim
            </h1>
            <h2 className="text-secondary lg:text-xl md:text-sm opacity-80">
              Feedback Board
            </h2>
          </div>
          <div className="my-6 bg-primary text-white rounded-3xl p-3 ">
           
            <Button
              className="bg-darker-blue m-1 p-2 rounded-xl lg:text-lg md:text-xs"
              variant="outline"
              onClick={() => filterByCategory(null)}
            >
              All
            </Button>

            {Array.from(new Set(data.map((item) => item.category))).map(
              (category) => (
                <ButtonFilter
                  key={category}
                  category={category}
                  filterByCategory={filterByCategory}
                />
              )
            )}
          </div>
          <RoadmapBox/>
        </div>
        <div className="w-full sm:w-2/3">
          <Filter
            sortData={sortData}
            sortBy={sortBy}
            cardCount={data.length}
            filteredCount={filteredCount}
          />

          {data
            .filter(
              (item) =>
                selectedCategory === null || item.category === selectedCategory
            )
            .map((item) => (
              <Link href={`/single-page/${item._id}`} key={item._id}>
                <Card
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  status={item.status}
                  upvotes={item.upvotes}
                  //@ts-ignore
                  comments={item.comments}
                />
              </Link>
            ))}
        </div>

        <div className="w-full sm:hidden bg-gray-50 mb-4 hidden relative">
          <Image
            src={backgroundHeaderTablet}
            className="rounded-2xl"
            alt="tablet bg"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-4">
            <h1 className="text-primary sm:text-xl font-bold ">Eqaim</h1>
            <h2 className="text-secondary sm:text-lg opacity-80">
              Feedback Board
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
