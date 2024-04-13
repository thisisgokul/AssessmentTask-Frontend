import React, { ChangeEvent } from "react";
import { status, category } from "@/constants";
import axiosInstance from "@/app/utils/axiosInstance";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  parmID?: string;

  formData: {
    title: string;
    category: string;
    status: string;
    description: string;
  };
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (event: React.FormEvent) => void;
}

const FeedbackForm: React.FC<Props> = ({
  formData,
  onChange,
  onSubmit,
  parmID,
}) => {
  const router = useRouter();
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const id = parmID;
      const response = await axiosInstance.delete(`/delete-feedback/${id}`);
      console.log("Data deleted successfully:", response.data);
      router.push("/");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  return (
    <form className="p-4">
      <h2 className="text-xl text-darker-gray-medium font-bold mb-4">
        {parmID ? `Editing, ${formData.title}` : " Create New Feedback"}
      </h2>
      <div className="mb-3">
        <label
          htmlFor="title"
          className="flex flex-col text-base text-darker-gray-medium font-bold mb-1"
        >
          Feedback Title
          <span className="font-medium text-xs text-slate-500">
            A Short Descriptive headline
          </span>
        </label>
        <input
          type="text"
          id="title"
          onChange={onChange}
          value={formData.title}
          placeholder="Enter feedback title"
          className="w-full border border-none text-darker-gray font-bold bg-secondary border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="category"
          className="flex flex-col text-base text-darker-gray-medium font-bold mb-1"
        >
          Category
          <span className="font-medium text-xs text-slate-500">
            Choose a Category for your Feedback
          </span>
        </label>
        <select
          id="category"
          onChange={onChange}
          value={formData.category}
          name="category"
          className="w-full border-none font-bold bg-medium-white text-darker-gray-medium rounded-md p-2"
        >
          <option>options</option>
          {category.map((cta) => (
            <option key={cta} value={cta}>
              {cta}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label
          htmlFor="status"
          className="flex flex-col text-base text-darker-gray-medium font-bold mb-1"
        >
          Status
          <span className="font-medium text-xs text-slate-500">
            Choose a Status for your Feedback
          </span>
        </label>
        <select
          id="status"
          name="status"
          onChange={onChange}
          value={formData.status}
          className="w-full border-none font-bold bg-medium-white text-darker-gray-medium rounded-md p-2"
        >
          <option>options</option>
          {status.map((sta) => (
            <option key={sta} value={sta}>
              {sta}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label
          htmlFor="description"
          className="flex flex-col text-base text-darker-gray-medium font-bold mb-1"
        >
          Feedback Details
          <span className="font-medium text-xs text-slate-500">
            Enter the Details of your Feedback
          </span>
        </label>
        <textarea
          id="description"
          onChange={onChange}
          value={formData.description}
          name="description"
          placeholder="Enter feedback details"
          className="w-full h-20 border-none rounded-md text-darker-gray font-bold bg-secondary border-gray-300 p-2"
          rows={4}
        ></textarea>
      </div>
      <div className="flex justify-between">
        {parmID && (
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-1 px-3 rounded-md mr-2"
          >
            Delete
          </button>
        )}
        <Link href={"/"}>
          <button className="bg-darker-gray text-white py-1 px-3 rounded-md mr-2">
            Cancel
          </button>
        </Link>
        <button
          onClick={onSubmit}
          className="bg-darker-violet text-white py-1 px-3 rounded-md"
        >
          {parmID ? "Update" : "submit"}
        </button>
      </div>
    </form>
  );
};

export default FeedbackForm;
