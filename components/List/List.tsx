"use client";

import React from "react";

import ListItem from "../ListItem/ListItem";

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
};

type ListProps = {
  data: Contact[];
  isLoading: boolean;
};

const List: React.FC<ListProps> = ({ data, isLoading }) => {
  return (
    <div className="w-full h-full p-6">
      {!isLoading &&
        data?.map((contact: Contact) => (
          <ListItem contact={contact} key={contact.id} />
        ))}
    </div>
  );
};

export default List;
