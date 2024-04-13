"use client";
import { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import axiosInstance from "@/app/utils/axiosInstance";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface FormData {
  newReplies: string[];
}
const CommentSection = ({ comments, data }: any) => {
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [newReplies, setnewReplies] = useState("");
  const [formData, setFormData] = useState<FormData>({ newReplies: [] });
  const { id } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/single-data/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [formData, id,]);

  const toggleDivVisibility = () => {
    setIsDivVisible(!isDivVisible);
  };

  const handleSubmit = async () => {
    try {
      if (!newReplies) {
        return;
      }
      await axiosInstance.post("/add-reply", { newReplies, id });
      toast.success("Replied Success")
      setIsDivVisible(false);
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  return (
    <>
      <div className="bg-primary shadow-xl rounded-lg px-3 mx-3 md:mx-2 lg:mx-0 my-4 p-3">
        <h2 className="text-darker-gray-medium font-extrabold p-4 sm:text-2xl">
          Comments
        </h2>
        {comments.map((comment: any) => (
          <div key={comment._id} className="mb-4 padding-x leading-6">
            <p className="font-bold text-darker-gray-medium">
              {comment.user.name}
            </p>
            <p className="font-medium text-gray-600">
              @{comment.user.username || "testUser"}
            </p>
            <p className="text-darker-gray-light font-semibold">
              {comment.content}
            </p>
            <div>
              <h4
                onClick={toggleDivVisibility}
                className="text-darker-blue font-bold text-end hover:underline cursor-pointer"
              >
                Reply
              </h4>
              {isDivVisible && (
                <div className="padding-x flex justify-center">
                  <input
                    onChange={(e) => setnewReplies(e.target.value)}
                    className="border-darker-blue border-2 rounded-2xl w-screen h-12"
                    id="reply"
                  />
                  <button
                    onClick={handleSubmit}
                    className="font-medium rounded-md text-white m-3 bg-darker-violet text-lg px-2"
                  >
                    Send
                  </button>
                </div>
              )}
            </div>
            {/* Displaying replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-4">
                {comment.replies.map((reply: any) => (
                  <div key={reply._id} className="mb-2">
                    <p className="font-bold text-darker-gray-medium">
                      {reply.user.name}
                    </p>
                    <p className="font-medium text-gray-600">
                      @{reply.user.username}
                    </p>
                    <p>
                      <span className="font-medium text-darker-violet text-lg">
                        @{reply.user.username}{" "}
                      </span>
                      {reply.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {formData.newReplies.map((reply, index) => (
              <div key={index}>
                <p className="text-sm font-bold opacity-70  text-darker-gray-medium">
                  {reply}
                </p>
              </div>
            ))}
          </div>
        ))}

        {data && data.newComments && data.newComments.length > 0 && (
          <div className="mb-4 padding-x leading-6">
            <h3 className="font-bold text-darker-gray-medium text-xl">
              New Comments
            </h3>
            {data.newComments.map((newComment: string, index: number) => (
              <div key={index} className="mb-2 mt-3">
                <p className="font-medium text-darker-gray-medium">
                  Anonymous User
                </p>
                <p className="text-darker-gray-light font-semibold">
                  {newComment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <CommentBox />
    </>
  );
};

export default CommentSection;
