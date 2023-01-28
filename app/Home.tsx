"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

import Image from "next/image";
import { useRouter } from "next/navigation";

import AddModal from "@/components/AddModal/AddModal";
import EditModal from "@/components/EditModal/EditModal";

import { glysa } from "./layout";
import { lexend } from "./layout";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
};

const Home = () => {
  const router = useRouter();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

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

  // Handle modal close
  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const deleteContact = async (id: number) => {
    const res = await axios.post<number>(`/api/delete-contact`, {
      id,
    });

    if (res.status === 200) {
      toast.success("Successfully deleted!");
      router.refresh();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Toaster />
      <div className={lexend.className}>
        <h1>JOOOOO</h1>
        <button onClick={() => setAddModalOpen(true)}>Add new</button>
        <AddModal
          handleAddModalClose={handleAddModalClose}
          isOpen={addModalOpen}
        />
        {!isLoading &&
          data?.map((contact: Contact) => (
            <div key={contact.id}>
              <Image
                src={contact.imageUrl}
                alt="Picture"
                width={50}
                height={50}
              />
              <h2>{contact.name}</h2>
              <p>{contact.email}</p>
              <p>{contact.imageUrl}</p>
              <button onClick={() => setEditModalOpen(true)}>Edit</button>
              <EditModal
                handleEditModalClose={handleEditModalClose}
                isOpen={editModalOpen}
                id={parseInt(contact.id)}
              />
              <button onClick={() => deleteContact(parseInt(contact.id))}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
