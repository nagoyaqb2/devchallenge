import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Home() {
  const {
    data: contacts,
    isLoading,
    error,
  } = useQuery("contacts", fetchContactList);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="min-h-full">
      <h1>Újcucc</h1>
    </div>
  );
}
