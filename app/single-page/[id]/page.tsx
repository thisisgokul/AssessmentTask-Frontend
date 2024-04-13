"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axiosInstance";
import Image from "next/image";
import { useParams } from "next/navigation";
import upArrow from "@/app/assets/icons/icon-arrow-up.svg";
import commenticon from "@/app/assets/icons/icon-comments.svg";
import { DataItem, Comment } from "@/types";
import CommentSection from "@/components/helpers/CommentSections";
import arrow from "@/app/assets/icons/icon-arrow-left.svg";
import Link from "next/link";

const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState<DataItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/single-data/${id}`);

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Function to count comments including replies
  const countComments = (comments: Comment[]) => {
    let count = 0;
    comments.forEach((comment) => {
      count++;
      if (comment.replies && comment.replies.length > 0) {
        count += comment.replies.length;
      }
    });
    return count;
  };

  return (
    <div className="lg:padding-x my-9">
      <div className="flex justify-between my-9 mx-8">
        <Link href={"/"}>
          <button className="text-darker-gray-medium font-bold flex">
            <span className="mt-2 mx-3">
              <Image src={arrow} alt="arrow" />
            </span>{" "}
            Go back
          </button>
        </Link>
        <Link href={`/edit-feedback/${id}`}>
          <button className="bg-darker-blue text-primary px-2 sm:px-3 py-1 sm:py-2 rounded-2xl">
            Edit FeedBack
          </button>
        </Link>
      </div>
      {/* Check if data is available */}
      {data && (
        <div className="bg-primary shadow-xl rounded-lg px-3 mx-3 md:mx-2 lg:mx-0 my-4 p-3 flex gap-6 items-center">
          <div className="bg-secondary px-1 sm:px-3 sm:w-12 w-8 flex flex-col justify-center items-center p-2 rounded-xl">
            <Image src={upArrow} alt="up arrow icon" />
            <span className="sm:text-base font-bold text-darker-gray text-sm">
              {data.upvotes}
            </span>
          </div>
          <div className="px-3  flex flex-col justify-center items-start p-2 rounded-xl">
            <h2 className="sm:text-2xl text-sm font-bold text-darker-gray-medium">
              {data.title}
            </h2>
            <p className="text-slate-500 sm:text-xl font-medium text-xs mt-2">
              {data.description}
            </p>
            <span className="sm:p-2 p-1 text-sm sm:text-lg bg-secondary rounded-xl mt-3 text-darker-blue">
              {data.category}
            </span>
          </div>
          <span className="text-sm lg:text-lg font-bold flex gap-3 sm:mr-8 mr-2 text-darker-gray ml-auto mt-3 sm:mt-0">
            <Image src={commenticon} alt="commenticon" />
            {data.comments && countComments(data.comments)}
          </span>
        </div>
      )}
      <CommentSection data={data} comments={data ? data.comments : []} />
    </div>
  );
};

export default Page;
