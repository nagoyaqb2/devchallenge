"use client";

import { useQuery } from "@tanstack/react-query";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
};

const Home = () => {
  const fetchContacts = async (): Promise<Contact[]> => {
    const res = await fetch("/api/get-contacts");
    return res.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Something went wrong</div>;

  return (
    <div>
      <h1>JOOOOO</h1>
      {data?.map((contact: Contact) => (
        <div key={contact.id}>
          <h2>{contact.name}</h2>
          <p>{contact.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
