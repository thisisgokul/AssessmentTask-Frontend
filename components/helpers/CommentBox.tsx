import React, { useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/app/utils/axiosInstance";
import { toast } from "sonner";
const MAX_CHARACTERS = 250;

const CommentBox = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const charactersLeft = MAX_CHARACTERS - comment.length;

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = (event.target as HTMLInputElement).value;
    setComment(inputValue.slice(0, MAX_CHARACTERS));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axiosInstance.post(`/add-comments`, { id, comment });
      toast.success("comment Added")
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <>
      <div className="bg-primary shadow-xl rounded-lg px-3 mx-3 md:mx-2 lg:mx-0 my-4 p-3">
        <h2 className="text-darker-gray-medium font-extrabold p-4 sm:text-2xl">
          Add Comment
        </h2>
        <form
          onSubmit={handleSubmit}
          action=""
          className="padding-x flex flex-col"
        >
          <div className="relative">
            <input
              className="border-2 border-darker-blue rounded-2xl w-full h-32 pr-12"
              type="text"
              value={comment}
              onChange={handleChange}
            />
          </div>
          <div className="mt-2">
            <span className="flex items-center text-xl font-semibold text-gray-500">
              {charactersLeft} characters left
            </span>
            <button
              type="submit"
              className="bg-darker-violet text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl float-right"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentBox;
