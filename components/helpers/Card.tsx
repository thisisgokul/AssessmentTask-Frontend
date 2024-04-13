import React from "react";
import upArrow from "@/app/assets/icons/icon-arrow-up.svg";
import commenticon from "@/app/assets/icons/icon-comments.svg";
import Image from "next/image";
import { CardProps, CardCommentData } from "@/types/index";

const countTotalComments = (comments: CardCommentData[]): number => {
  if (!comments) return 0;
  let totalComments = comments.length;
  comments.forEach((comment) => {
    if (comment.replies) {
      totalComments += countTotalComments(comment.replies);
    }
  });
  return totalComments;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  status,
  upvotes,
  comments,
}) => {
  const totalComments = countTotalComments(comments);

  return (
    <div className="bg-primary shadow-xl rounded-lg px-3 mx-3 md:mx-2 lg:mx-0 my-4 p-3 flex gap-6 items-center">
      <div className="bg-secondary px-1 sm:px-3 sm:w-12 w-8 flex flex-col justify-center items-center p-2 rounded-xl">
        <Image src={upArrow} alt="up arrow icon" />
        <span className="sm:text-base font-bold text-darker-gray text-sm">
          {upvotes}
        </span>
      </div>
      <div className="px-3  flex flex-col justify-center items-start p-2 rounded-xl">
        <h2 className="sm:text-xl text-sm font-bold text-darker-gray-medium">
          {title}
        </h2>
        <p className="text-slate-500 sm:text-base font-medium text-xs mt-2">
          {description}
        </p>
        <span className="sm:p-2 p-1 text-sm sm:text-base bg-secondary rounded-xl mt-3 text-darker-blue">
          {status}
        </span>
      </div>
      <span className="text-sm lg:text-lg font-bold flex gap-3 text-darker-gray ml-auto mt-3 sm:mt-0">
        <Image src={commenticon} alt="commenticon" />
        {totalComments}
      </span>
    </div>
  );
};

export default Card;
