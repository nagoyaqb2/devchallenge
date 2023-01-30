"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Toaster } from "react-hot-toast";

import List from "@/components/List/List";
import UpperComponent from "@/components/UpperComponent/UpperComponent";

import { lexend } from "@/app/layout";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
};

const Home = () => {
  // Fetch contacts function
  const fetchContacts = async () => {
    const res = await axios.get<Contact[]>(`/api/get-contacts`);
    return res.data;
  };

  // Fetch contacts query
  const { data, isLoading, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });

  // Error handling
  if (error) return <div>Something went wrong</div>;

  return (
    <>
      <Toaster />
      <div
        className={
          lexend.className + " min-h-screen border-l border-r border-[#282828]"
        }
      >
        <UpperComponent />
        {!isLoading ? (
          <List data={data as Contact[]} isLoading={isLoading} />
        ) : null}
      </div>
    </>
  );
};

export default Home;
