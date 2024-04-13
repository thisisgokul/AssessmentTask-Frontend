"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import arrow from "@/app/assets/icons/icon-arrow-left.svg";

import { DataItem } from "@/types";
import axiosInstance from "../utils/axiosInstance";
import RoadmapCard from "@/components/helpers/RoadmapCard";

const Page = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [showPlanned, setShowPlanned] = useState(false);
  const [showInProgress, setShowInProgress] = useState(false);
  const [showLive, setShowLive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<DataItem[]>("/all-data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter data based on status
  const plannedData = data.filter((item) => item.status === "planned");
  const inProgressData = data.filter((item) => item.status === "in-progress");
  const liveData = data.filter((item) => item.status === "live");

  return (
    <div className="lg:padding-x sm:mx-5 md:pt-0 md:mx-0 lg:pt-9">
      <div className="flex justify-between bg-darker-gray p-8 md:rounded-none lg:rounded-3xl ">
        <div className="text-primary font-semibold">
          <Link href={"/"}>
            <h2 className="flex gap-2 justify-center items-center">
              <span>
                <Image src={arrow} alt="arrow" />
              </span>
              Go Back
            </h2>
          </Link>
          <h1 className="text-lg sm:text-2xl">Roadmap</h1>
        </div>
        <Link href={"/add-feedback"}>
          <Button className="bg-darker-violet hover:opacity-90 hover:bg-darker-violet text-primary text-sm sm:text-base lg:text-lg px-2 py-1 sm:px-3 sm:py-2 rounded-md">
            <span className="text-sm lg:text-xl font-bold">+</span> Add Feedback
          </Button>
        </Link>
      </div>

      <div className="flex justify-evenly">
        <div>
          <h2
            onClick={() => setShowPlanned(!showPlanned)}
            className="text-sm font-bold text-darker-gray-medium lg:text-xl md:text-base mt-6"
          >
            Planned ({plannedData.length})
          </h2>
          <p className="text-darker-gray-light lg:text-lg text-xs">
            Ideas prioritize for Research
          </p>
        </div>
        <div>
          <h2
            onClick={() => setShowInProgress(!showInProgress)}
            className="text-sm font-bold text-darker-gray-medium lg:text-xl md:text-base mt-6"
          >
            In Progress ({inProgressData.length})
          </h2>
          <p className="text-darker-gray-light lg:text-lg text-xs">
            Currently being developed.
          </p>
        </div>
        <div>
          <h2
            onClick={() => setShowLive(!showLive)}
            className="text-sm font-bold text-darker-gray-medium lg:text-xl md:text-base mt-6"
          >
            Live ({liveData.length})
          </h2>
          <p className="text-darker-gray-light lg:text-lg text-xs">Released features</p>
        </div>
      </div>
      <hr />
      <div className="flex justify-between md:mx-3 lg:mx-9">
        <div>
          {plannedData.map((item) => (
            <div className="mt-7 mx-4" key={item._id}>
              <div className="bg-white md:block lg:block hidden rounded-lg shadow-md p-4 shadow-lighter-orange">
                <li className="flex items-center text-darker-gray-medium md:text-base lg:text-lg">
                  <span className="h-2 w-2 rounded-full bg-lighter-orange mr-2"></span>
                  Planned
                </li>
                <RoadmapCard item={item} />
              </div>
            </div>
          ))}
        </div>

        <div>
          {inProgressData.map((item) => (
            <div className="mt-7 mx-4" key={item._id}>
              <div className="bg-white  md:block lg:block hidden rounded-lg shadow-md p-4 shadow-darker-violet">
                <li className="flex items-center text-darker-gray-medium md:text-base lg:text-lg">
                  <span className="h-2 w-2 rounded-full bg-darker-violet mr-2"></span>
                  In-progress
                </li>
                <RoadmapCard item={item} />
              </div>
            </div>
          ))}
        </div>

        <div>
          {liveData.map((item) => (
            <div className="mt-7 mx-4" key={item.id}>
              <div className="bg-white md:block lg:block hidden rounded-lg shadow-md p-4 shadow-lighter-blue">
                <li className="flex items-center text-darker-gray-medium md:text-base lg:text-lg">
                  <span className="h-2 w-2 rounded-full bg-lighter-blue mr-2"></span>
                  Live
                </li>
                <RoadmapCard item={item} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        {showPlanned &&
          plannedData.map((item) => (
            <div className="mt-7 mx-4 lg:hidden md:hidden " key={item._id}>
              <div className="bg-white  rounded-lg shadow-md p-4 shadow-lighter-orange">
                <li className="flex items-center text-darker-gray-medium md:text-base lg:text-lg">
                  <span className="h-2 w-2 rounded-full bg-lighter-orange mr-2"></span>
                  Planned
                </li>
                <RoadmapCard item={item} />
              </div>
            </div>
          ))}
        {showInProgress &&
          inProgressData.map((item) => (
            <div className="mt-7 mx-4 lg:hidden md:hidden " key={item._id}>
              <div className="bg-white  rounded-lg shadow-md p-4 shadow-darker-violet">
                <li className="flex items-center text-darker-gray-medium md:text-base lg:text-lg">
                  <span className="h-2 w-2 rounded-full bg-darker-violet mr-2"></span>
                  In-Progress
                </li>
                <RoadmapCard item={item} />
              </div>
            </div>
          ))}
        {showLive &&
          liveData.map((item) => (
            <div className="mt-7 mx-4 lg:hidden md:hidden " key={item._id}>
              <div className="bg-white  rounded-lg shadow-md p-4 shadow-lighter-blue">
                <li className="flex items-center text-darker-gray-medium md:text-base lg:text-lg">
                  <span className="h-2 w-2 rounded-full bg-lighter-blue mr-2"></span>
                  Live
                </li>
                <RoadmapCard item={item} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
