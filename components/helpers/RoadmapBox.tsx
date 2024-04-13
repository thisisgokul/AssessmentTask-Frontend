import axiosInstance from "@/app/utils/axiosInstance";
import { DataItem } from "@/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RoadmapBox = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [statusCounts, setStatusCounts] = useState<{ [key: string]: number }>({
    planned: 0,
    "in-progress": 0,
    live: 0,
  });

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

  useEffect(() => {
    const counts: { [key: string]: number } = {
      planned: 0,
      "in-progress": 0,
      live: 0,
    };
    data.forEach((item) => {
      counts[item.status] = (counts[item.status] || 0) + 1;
    });
    setStatusCounts(counts);
  }, [data]);

  return (
    <div className="my-6 bg-primary text-white rounded-3xl p-3 ">
      <div className="flex justify-between">
        <h1 className="md:text-sm lg:text-xl text-darker-gray font-bold">
          Roadmap
        </h1>
        <Link href={"/roadmap"}>
          <h2 className="md:text-xs lg:text-lg text-darker-blue font-medium underline">
            View
          </h2>
        </Link>
      </div>

      <div className="flex justify-between mt-3">
        <ul>
          <li className="flex items-center text-darker-gray-medium md:text-base lg:text-lg">
            <span className="h-2 w-2 rounded-full bg-lighter-orange mr-2"></span>
            Planned
          </li>
          <li className="flex items-center text-darker-gray-medium md:text-base lg:text-lg">
            <span className="h-2 w-2 rounded-full bg-darker-violet mr-2"></span>{" "}
            In-progress
          </li>
          <li className="flex items-center text-darker-gray-medium md:text-base lg:text-lg">
            <span className="h-2 w-2 rounded-full bg-lighter-blue mr-2"></span>{" "}
            Live
          </li>
        </ul>
        <div className="flex text-darker-gray-light font-extrabold text-xl flex-col">
          <span>{statusCounts.planned}</span>
          <span>{statusCounts["in-progress"]}</span>
          <span>{statusCounts.live}</span>
        </div>
      </div>
    </div>
  );
};

export default RoadmapBox;
