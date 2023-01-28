"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useForm, useFormState, SubmitHandler } from "react-hook-form";
import { glysa } from "../../app/layout";
import { toast } from "react-hot-toast";

// Types
type Props = {
  handleEditModalClose: () => void;
  isOpen: boolean;
  id: number;
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

const EditModal = ({ handleEditModalClose, isOpen, id }: Props) => {
  const queryClient = useQueryClient();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  console.log(id);

  // Fetch contact function
  const fetchContact = async (id: number) => {
    const res = await axios.post<Contact>(`/api/get-contact`, {
      id,
    });

    const contactData = res.data;

    console.log(contactData);

    return contactData;
  };

  // Fetch contacts query
  const contacts = useQuery({
    queryKey: ["contact", id],
    queryFn: () => fetchContact(id),
  });

  console.log(contacts);

  // Form functions and initial values
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    getValues,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<FormValue>({
    defaultValues: {
      name: contacts.data?.name,
      email: contacts.data?.email,
      phone: contacts.data?.phone,
      image: contacts.data?.imageUrl,
    },
  });

  // Get dirty fields
  const { dirtyFields } = useFormState({ control });

  // Create contact function
  const editContactFn = async (formData: Contact) => {
    const res = await axios.post<Contact>("/api/update-contact", formData);

    return res.data;
  };

  // Create contact mutation
  const { mutate: createContact, isLoading } = useMutation(
    (contact: Contact) => editContactFn(contact),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["contact"] });
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
  };

  // Upload image to cloudinary
  const uploadImage = async (image: FileList) => {
    var cloudinaryData = new FormData();

    cloudinaryData.append("upload_preset", "bbnq9aud");
    cloudinaryData.append("file", image[0]);

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
      handleEditModalClose();
    }
  }, [formState, handleEditModalClose, reset]);

  // Watch for image change
  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      // Set preview image
      if (getValues("image")) {
        const file = getValues("image")[0];
        setFile(file);
        setPreview(URL.createObjectURL(file));
      } else {
        setFile(null);
        setPreview(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, getValues]);

  return (
    <div
      className={
        isOpen
          ? "fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto bg-[rgba(0,0,0,0.4)] outline-none"
          : "hidden"
      }
    >
      <div className="relative w-auto pointer-events-none">
        <div className="fixed flex flex-col max-h-[510px] w-full max-w-[364px] translate-x-[-50%] translate-y-[-50%] bg-[#141414] pointer-events-auto border-none rounded-lg top-1/2 left-1/2">
          <div className="relative p-6">
            <h2
              className={
                glysa.className + " leading-10 text-2xl font-medium mb-6"
              }
            >
              Edit {id} contact
            </h2>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="flex flex-col w-full gap-1 mb-6">
                <div>
                  {preview ? (
                    <Image
                      src={preview}
                      width={250}
                      height={250}
                      alt="Avatar picture"
                    />
                  ) : null}
                  <input
                    type="file"
                    id="fileUpload"
                    className="hidden"
                    {...register("image")}
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    {!preview ? (
                      <span>Add picture</span>
                    ) : (
                      <span>Change picture</span>
                    )}
                  </label>
                  {preview ? (
                    <div
                      className="cursor-pointer"
                      onClick={() => reset({ image: undefined })}
                    >
                      Delete image
                    </div>
                  ) : null}
                </div>
                <label className="w-full text-xs tracking-[1%] text-[rgba(255,255,255,0.56)]">
                  Name
                </label>
                <input
                  className={
                    dirtyFields.name
                      ? "rounded-lg w-full border border-solid border-[#282828] focus-visible:border-[#414141] outline-none h-10 bg-[#1E1E1E] focus-visible:bg-[#282828] px-3 py-2 text-sm leading-[18px] text-white"
                      : "rounded-lg w-full border border-solid border-[#282828] focus-visible:border-[#373737] outline-none ring-0 h-10 bg-[#1E1E1E] px-3 py-2 text-sm leading-[18px] text-[rgba(255,255,255,0.32)]"
                  }
                  type="text"
                  placeholder="Jamie Wright"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="flex flex-col w-full gap-1 mb-6">
                <label className="w-full text-xs tracking-[1%] text-[rgba(255,255,255,0.56)]">
                  Phone number
                </label>
                <input
                  className={
                    dirtyFields.phone
                      ? "rounded-lg w-full border border-solid border-[#282828] focus-visible:border-[#414141] outline-none h-10 bg-[#1E1E1E] focus-visible:bg-[#282828] px-3 py-2 text-sm leading-[18px] text-white"
                      : "rounded-lg w-full border border-solid border-[#282828] focus-visible:border-[#373737] outline-none ring-0 h-10 bg-[#1E1E1E] px-3 py-2 text-sm leading-[18px] text-[rgba(255,255,255,0.32)]"
                  }
                  type="text"
                  placeholder="+01 234 5678"
                  {...register("phone", { required: true })}
                />
              </div>
              <div className="flex flex-col w-full gap-1 mb-6">
                <label className="w-full text-xs tracking-[1%] text-[rgba(255,255,255,0.56)]">
                  Email address
                </label>
                <input
                  className={
                    dirtyFields.email
                      ? "rounded-lg w-full border border-solid border-[#282828] focus-visible:border-[#414141] outline-none h-10 bg-[#1E1E1E] focus-visible:bg-[#282828] px-3 py-2 text-sm leading-[18px] text-white"
                      : "rounded-lg w-full border border-solid border-[#282828] focus-visible:border-[#373737] outline-none ring-0 h-10 bg-[#1E1E1E] px-3 py-2 text-sm leading-[18px] text-[rgba(255,255,255,0.32)]"
                  }
                  type="email"
                  placeholder="jamie.wright@mail.com"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="flex flex-row items-start justify-end gap-2 pt-6">
                <button
                  type="button"
                  className="px-4 py-2 text-sm rounded-lg"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                    handleEditModalClose(),
                      reset({
                        name: "",
                        email: "",
                        phone: "",
                        image: undefined,
                      });
                  }}
                >
                  Cancel
                </button>
                <input
                  type="submit"
                  value="Save"
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

export default EditModal;
