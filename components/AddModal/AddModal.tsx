"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { motion } from "framer-motion";

import {
  useForm,
  useFormState,
  SubmitHandler,
  useWatch,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { glysa } from "../../app/layout";
import { toast } from "react-hot-toast";

// Types
type Props = {
  handleAddModalClose: () => void;
  isOpen: boolean;
};

type Contact = {
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
};

type FormValue = {
  name: string;
  email: string;
  phone: string;
  image: FileList;
};

const AddModal = ({ handleAddModalClose, isOpen }: Props) => {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    name: yup.string().required("Name is required"),
  });

  // Form functions and initial values
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    getValues,
    formState,
    formState: { isSubmitSuccessful, errors },
  } = useForm<FormValue>({ resolver: yupResolver(schema) });

  // Get dirty fields
  const { dirtyFields } = useFormState({ control });

  // Create contact function
  const createContactFn = async (formData: Contact) => {
    const res = await axios.post<Contact>("/api/create-contact", formData);

    return res.data;
  };

  // Create contact mutation
  const { mutate: createContact, isLoading } = useMutation(
    (contact: Contact) => createContactFn(contact),
    {
      onSuccess: () => {
        toast.success("Successfully created!");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    }
  );

  // Form submit handler
  const onSubmitHandler: SubmitHandler<FormValue> = async (data) => {
    const { name, email, phone, image } = data;

    const imageUrl: string = await uploadImage(image);

    const formData = { name, email, phone, imageUrl };

    createContact(formData);

    router.push("/");
  };

  // Upload image to cloudinary
  const uploadImage = async (image: FileList) => {
    var cloudinaryData = new FormData();

    cloudinaryData.append("upload_preset", "bbnq9aud");
    cloudinaryData.append("file", image[0]);

    // Return default image if no image is selected
    if (!image[0])
      return "https://res.cloudinary.com/df4tacw8n/image/upload/v1674861458/Default_gvmikh.jpg";

    // Upload image to cloudinary if image is selected
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/df4tacw8n/image/upload",
      cloudinaryData
    );

    const imageUrl = res.data.secure_url;

    if (res.data) {
      return imageUrl;
    }
  };

  // Reset form after successful submit
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ name: "", email: "", phone: "", image: undefined });
      handleAddModalClose();
    }
  }, [formState, handleAddModalClose, reset]);

  // Watch image input
  const imageWatch = useWatch({ control, name: "image" });

  // Set preview image
  useEffect(() => {
    if (imageWatch) {
      if (getValues("image")) {
        const file = getValues("image")[0];
        setFile(file);
        setPreview(URL.createObjectURL(file));
      } else {
        setFile(null);
        setPreview(null);
      }
    }
  }, [imageWatch, getValues]);

  return (
    <div
      className={
        isOpen
          ? "fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-hidden bg-[rgba(0,0,0,0.4)] outline-none"
          : "hidden"
      }
    >
      <div className="relative w-auto pointer-events-none">
        <div className="fixed flex flex-col h-auto w-full max-w-[364px] translate-x-[-50%] translate-y-[-50%] bg-[#141414] pointer-events-auto border-none rounded-lg top-1/2 left-1/2">
          <div className="relative p-6">
            <h2
              className={
                glysa.className + " leading-10 text-2xl font-medium mb-6"
              }
            >
              Add contact
            </h2>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="flex flex-row items-center mb-5">
                <div className="relative w-[88px] h-[88px] min-w-[88px] mr-4">
                  <Image
                    src={
                      preview
                        ? preview
                        : "https://res.cloudinary.com/df4tacw8n/image/upload/v1674861458/Default_gvmikh.jpg"
                    }
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-full"
                    alt="Avatar picture"
                  />
                </div>
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  {...register("image")}
                />
                <motion.label
                  initial={{ opacity: 0.6 }}
                  whileTap={{ scale: 0.9 }}
                  whileInView={{ opacity: 1 }}
                  htmlFor="fileUpload"
                  className="py-2 pl-3 pr-4 mr-2 text-sm rounded-lg cursor-pointer bg-[#282828] hover:bg-[#2D2D2D] active:bg-[#323232]"
                >
                  <div className="flex flex-row items-center justify-between">
                    {!preview ? (
                      <>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="mr-2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.25 18.75V12.75H5.25V11.25H11.25V5.25H12.75V11.25H18.75V12.75H12.75V18.75H11.25Z"
                            fill="white"
                          />
                        </svg>
                        <span>Add picture</span>
                      </>
                    ) : (
                      <>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="mr-2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.65 5.0001L11.975 8.6501L10.925 7.6001L12.775 5.7501H12C10.2667 5.7501 8.79167 6.36243 7.575 7.5871C6.35833 8.81243 5.75 10.3001 5.75 12.0501C5.75 12.4668 5.796 12.8791 5.888 13.2871C5.97933 13.6958 6.11667 14.1001 6.3 14.5001L5.175 15.6251C4.875 15.0584 4.646 14.4751 4.488 13.8751C4.32933 13.2751 4.25 12.6668 4.25 12.0501C4.25 9.88343 5.00433 8.04176 6.513 6.5251C8.021 5.00843 9.85 4.2501 12 4.2501H12.775L10.925 2.4001L11.975 1.3501L15.65 5.0001ZM8.35 19.0001L12.025 15.3501L13.075 16.4001L11.225 18.2501H12C13.7333 18.2501 15.2083 17.6378 16.425 16.4131C17.6417 15.1878 18.25 13.7001 18.25 11.9501C18.25 11.5334 18.2043 11.1208 18.113 10.7121C18.021 10.3041 17.8833 9.9001 17.7 9.5001L18.825 8.3751C19.125 8.94176 19.3543 9.5251 19.513 10.1251C19.671 10.7251 19.75 11.3334 19.75 11.9501C19.75 14.1168 18.996 15.9584 17.488 17.4751C15.9793 18.9918 14.15 19.7501 12 19.7501H11.225L13.075 21.6001L12.025 22.6501L8.35 19.0001Z"
                            fill="white"
                          />
                        </svg>
                        <span>Change picture</span>
                      </>
                    )}
                  </div>
                </motion.label>
                <motion.div
                  initial={{ opacity: 0.6 }}
                  whileTap={{ scale: 0.9 }}
                  whileInView={{ opacity: 1 }}
                  className={
                    preview
                      ? "p-2 cursor-pointer rounded-lg bg-[#282828] hover:bg-[#2D2D2D] active:bg-[#323232]"
                      : "hidden"
                  }
                  onClick={() => {
                    reset({ image: undefined });
                    setPreview(null);
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.3 18.9998H15.7C15.7667 18.9998 15.8333 18.9665 15.9 18.8998C15.9667 18.8331 16 18.7665 16 18.6998V8.9998H8V18.6998C8 18.7665 8.03333 18.8331 8.1 18.8998C8.16667 18.9665 8.23333 18.9998 8.3 18.9998ZM5.625 6.2998V4.7998H8.6L9.6 3.7998H14.4L15.4 4.7998H18.375V6.2998H5.625ZM8.3 20.4998C7.8 20.4998 7.375 20.3248 7.025 19.9748C6.675 19.6248 6.5 19.1998 6.5 18.6998V7.4998H17.5V18.6998C17.5 19.1998 17.325 19.6248 16.975 19.9748C16.625 20.3248 16.2 20.4998 15.7 20.4998H8.3ZM8 18.9998H16C16 18.9998 15.9667 18.9998 15.9 18.9998C15.8333 18.9998 15.7667 18.9998 15.7 18.9998H8.3C8.23333 18.9998 8.16667 18.9998 8.1 18.9998C8.03333 18.9998 8 18.9998 8 18.9998Z"
                      fill="white"
                    />
                  </svg>
                </motion.div>
              </div>
              <div className="flex flex-col w-full gap-1 mb-6">
                <label className="w-full text-xs tracking-[1%] text-[rgba(255,255,255,0.56)]">
                  Name
                </label>
                <input
                  className={
                    dirtyFields.name
                      ? "rounded-lg w-full border border-solid border-[#282828] hover:border-[#373737] focus-visible:border-[#414141] outline-none h-10 bg-[#1E1E1E] focus-visible:bg-[#282828] px-3 py-2 text-sm leading-[18px] text-white"
                      : "rounded-lg w-full border border-solid border-[#282828] hover:border-[#373737] focus-visible:border-[#373737] outline-none ring-0 h-10 bg-[#1E1E1E] px-3 py-2 text-sm leading-[18px] placeholder:text-[rgba(255,255,255,0.32)]"
                  }
                  type="text"
                  placeholder="Jamie Wright"
                  {...register("name", { required: true })}
                />
                <p className="text-xs text-red-500">{errors.name?.message}</p>
              </div>
              <div className="flex flex-col w-full gap-1 mb-6">
                <label className="w-full text-xs tracking-[1%] text-[rgba(255,255,255,0.56)]">
                  Phone number
                </label>
                <input
                  className={
                    dirtyFields.phone
                      ? "rounded-lg w-full border border-solid border-[#282828] hover:border-[#373737] focus-visible:border-[#414141] outline-none h-10 bg-[#1E1E1E] focus-visible:bg-[#282828] px-3 py-2 text-sm leading-[18px] text-white"
                      : "rounded-lg w-full border border-solid border-[#282828] hover:border-[#373737] focus-visible:border-[#373737] outline-none ring-0 h-10 bg-[#1E1E1E] px-3 py-2 text-sm leading-[18px] placeholder:text-[rgba(255,255,255,0.32)]"
                  }
                  type="text"
                  placeholder="+01 234 5678"
                  {...register("phone", { required: true })}
                />
                <p className="text-xs text-red-500">{errors.phone?.message}</p>
              </div>
              <div className="flex flex-col w-full gap-1 mb-6">
                <label className="w-full text-xs tracking-[1%] text-[rgba(255,255,255,0.56)]">
                  Email address
                </label>
                <input
                  className={
                    dirtyFields.email
                      ? "rounded-lg w-full border border-solid border-[#282828] hover:border-[#373737] focus-visible:border-[#414141] outline-none h-10 bg-[#1E1E1E] focus-visible:bg-[#282828] px-3 py-2 text-sm leading-[18px] text-white"
                      : "rounded-lg w-full border border-solid border-[#282828] hover:border-[#373737] focus-visible:border-[#373737] outline-none ring-0 h-10 bg-[#1E1E1E] px-3 py-2 text-sm leading-[18px] placeholder:text-[rgba(255,255,255,0.32)]"
                  }
                  type="email"
                  placeholder="jamie.wright@mail.com"
                  {...register("email", { required: true })}
                />
                <p className="text-xs text-red-500">{errors.email?.message}</p>
              </div>
              <div className="flex flex-row items-start justify-end gap-2 pt-6">
                <motion.button
                  initial={{ opacity: 0.6 }}
                  whileTap={{ scale: 0.9 }}
                  whileInView={{ opacity: 1 }}
                  type="button"
                  className="px-4 py-2 text-sm rounded-lg"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                    handleAddModalClose(),
                      reset({
                        name: "",
                        email: "",
                        phone: "",
                        image: undefined,
                      });
                  }}
                >
                  Cancel
                </motion.button>
                <motion.input
                  initial={{ opacity: 0.6 }}
                  whileTap={{ scale: 0.9 }}
                  whileInView={{ opacity: 1 }}
                  type="submit"
                  value="Done"
                  disabled={isLoading}
                  className="px-4 py-2 bg-[#262626] rounded-lg text-sm cursor-pointer"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
