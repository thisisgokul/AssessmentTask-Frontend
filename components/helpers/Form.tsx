"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import editsvg from "@/app/assets/icons/icon-edit-feedback.svg";
import newsvg from "@/app/assets/icons/icon-new-feedback.svg";
import arrow from "@/app/assets/icons/icon-arrow-left.svg";
import Image from "next/image";
import FeedbackForm from "./FeedbackForm";
import axiosInstance from "@/app/utils/axiosInstance";
import Link from "next/link";
import { toast } from "sonner";

interface FormData {
  title: string;
  category: string;
  status: string;
  description: string;
}
interface FormProps {
  parmID?: string; 
}

const Form: React.FC<FormProps> = ({ parmID }) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    status: "",
    description: "",
  });
  const [error,setError] = useState("")

  useEffect(() => {
    if (parmID) {
      const id = parmID;
      axiosInstance
        .get(`/single-data/${id}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [parmID]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      if (parmID) {
        const id =parmID
        await axiosInstance.put(`/edit-feedback/${id}`, formData);
        toast.success("Feedback edited successfully.");
      } else {
        if (!formData.title || !formData.category || !formData.status || !formData.description) {
         toast.error("Please add values")
          return;
        }
        await axiosInstance.post("/add-feedback", formData);
        toast.success("Feedback submitted successfully.")
        setFormData({
          title: "",
          category: "",
          status: "",
          description: "",
        });
      }
    } catch (error) {
      console.error('Error handling feedback:', error);
      toast.error("error")
    }
  };
  

  useEffect(() => {
    console.log(parmID);
  }, []);

  return (
    <>
      <Link href={"/"}>
        <span className="font-bold text-lg cursor-pointer sm:my-0 my-3 text-darker-gray flex gap-2">
          <Image src={arrow} alt="back" />
          Go Back
        </span>
      </Link>
      <div className="max-w-md mx-auto bg-primary shadow-md p-2 rounded-lg">
        {parmID ? (
          <Image src={editsvg} alt="edit" />
        ) : (
          <Image src={newsvg} alt="new" />
        )}
       
        <FeedbackForm
          parmID={parmID}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default Form;
