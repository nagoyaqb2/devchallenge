"use client";

import { useState } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import axios from "axios";
import { toast } from "react-hot-toast";

import EditModal from "@/components/EditModal/EditModal";

import { useRouter } from "next/navigation";

interface IContact {
  contact: Contact;
}

type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
};

const ListItem: React.FC<IContact> = ({ contact }) => {
  const router = useRouter();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showOptions, setShowOptions] = useState<number>();

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const deleteContact = async (id: number) => {
    const res = await axios.post<number>(`/api/delete-contact`, {
      id,
    });

    if (res.status === 200) {
      toast.success("Successfully deleted!");
      router.push("/");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <div
      key={contact.id}
      className="flex flex-row items-center justify-between w-full mb-6 group"
    >
      <div className="flex flex-row">
        <div className="relative h-[40px] w-[40px] min-w-[40px] mr-4">
          <Image
            src={contact.imageUrl}
            alt="Picture"
            fill
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAACAAIDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAbEAACAgMBAAAAAAAAAAAAAAAAAwECEyMyQv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCAxzMt9l+p9SAAP//Z"
            className="rounded-full"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="w-full h-auto">
          <h3 className="text-[16px] leading-[24px] tracking-[1%]">
            {contact.name}
          </h3>
          <p className="text-sm leading-[16px] tracking-[1%] text-[rgba(255,255,255,0.56)]">
            {contact.phone}
          </p>
        </div>
      </div>
      <div
        className={
          showOptions === contact.id
            ? "gap-2 cursor-pointer flex flex-row"
            : "hidden gap-2 cursor-pointer group-hover:flex"
        }
      >
        <div className="p-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.25002 18.8748V17.3748H6.25002V10.1248C6.25002 9.8748 6.26669 9.64147 6.30002 9.4248C6.33336 9.20814 6.37502 8.99147 6.42502 8.7748L2.02502 4.3748L3.10002 3.3248L20.925 21.1498L19.875 22.2248L16.5 18.8748H4.25002ZM17.75 15.1498L16.25 13.6498V10.1248C16.25 8.94147 15.8334 7.93714 15 7.1118C14.1667 6.28714 13.1667 5.8748 12 5.8748C11.5334 5.8748 11.071 5.9538 10.613 6.1118C10.1544 6.27047 9.75002 6.4998 9.40002 6.7998L8.32502 5.7248C8.67502 5.4248 9.05836 5.17047 9.47502 4.9618C9.89169 4.7538 10.3167 4.5998 10.75 4.4998V3.7998C10.75 3.4498 10.871 3.1538 11.113 2.9118C11.3544 2.67047 11.65 2.5498 12 2.5498C12.35 2.5498 12.6457 2.67047 12.887 2.9118C13.129 3.1538 13.25 3.4498 13.25 3.7998V4.4998C14.5 4.78314 15.5627 5.43747 16.438 6.4628C17.3127 7.48747 17.75 8.70814 17.75 10.1248V15.1498ZM12 21.7998C11.5 21.7998 11.075 21.6248 10.725 21.2748C10.375 20.9248 10.2 20.4998 10.2 19.9998H13.8C13.8 20.4998 13.625 20.9248 13.275 21.2748C12.925 21.6248 12.5 21.7998 12 21.7998ZM7.75002 17.3748H14.975L7.80002 10.1748C7.78336 10.2415 7.77102 10.3121 7.76302 10.3868C7.75436 10.4621 7.75002 10.5331 7.75002 10.5998V17.3748Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="p-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.55 20.5H5.3C4.8 20.5 4.375 20.325 4.025 19.975C3.675 19.625 3.5 19.2 3.5 18.7V12C3.5 10.8167 3.725 9.71267 4.175 8.688C4.625 7.66267 5.23333 6.76667 6 6C6.76667 5.23333 7.66267 4.625 8.688 4.175C9.71267 3.725 10.8167 3.5 12 3.5C13.1833 3.5 14.2873 3.725 15.312 4.175C16.3373 4.625 17.2333 5.23333 18 6C18.7667 6.76667 19.375 7.66267 19.825 8.688C20.275 9.71267 20.5 10.8167 20.5 12V18.7C20.5 19.2 20.325 19.625 19.975 19.975C19.625 20.325 19.2 20.5 18.7 20.5H15.45V13.425H19V12C19 10.05 18.3207 8.39567 16.962 7.037C15.604 5.679 13.95 5 12 5C10.05 5 8.396 5.679 7.038 7.037C5.67933 8.39567 5 10.05 5 12V13.425H8.55V20.5ZM7.05 14.925H5V18.7C5 18.7667 5.03333 18.8333 5.1 18.9C5.16667 18.9667 5.23333 19 5.3 19H7.05V14.925ZM16.95 14.925V19H18.7C18.7667 19 18.8333 18.9667 18.9 18.9C18.9667 18.8333 19 18.7667 19 18.7V14.925H16.95ZM16.95 14.925H19C19 14.925 18.9667 14.925 18.9 14.925C18.8333 14.925 18.7667 14.925 18.7 14.925H16.95ZM7.05 14.925H5.3C5.23333 14.925 5.16667 14.925 5.1 14.925C5.03333 14.925 5 14.925 5 14.925H7.05Z"
              fill="white"
            />
          </svg>
        </div>
        <motion.div
          initial={{ opacity: 0.6 }}
          whileTap={{ scale: 0.9 }}
          whileInView={{ opacity: 1 }}
          className={showOptions ? "p-2 bg-[#1E1E1E] rounded-lg" : "p-2"}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            onClick={() => {
              if (showOptions !== contact.id) {
                setShowOptions(contact.id);
              } else {
                setShowOptions(undefined);
              }
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.22498 13.5C5.80831 13.5 5.45431 13.354 5.16298 13.062C4.87098 12.7707 4.72498 12.4167 4.72498 12C4.72498 11.5833 4.87098 11.2293 5.16298 10.938C5.45431 10.646 5.80831 10.5 6.22498 10.5C6.64164 10.5 6.99598 10.646 7.28798 10.938C7.57931 11.2293 7.72498 11.5833 7.72498 12C7.72498 12.4167 7.57931 12.7707 7.28798 13.062C6.99598 13.354 6.64164 13.5 6.22498 13.5ZM12 13.5C11.5833 13.5 11.2293 13.354 10.938 13.062C10.646 12.7707 10.5 12.4167 10.5 12C10.5 11.5833 10.646 11.2293 10.938 10.938C11.2293 10.646 11.5833 10.5 12 10.5C12.4166 10.5 12.7706 10.646 13.062 10.938C13.354 11.2293 13.5 11.5833 13.5 12C13.5 12.4167 13.354 12.7707 13.062 13.062C12.7706 13.354 12.4166 13.5 12 13.5ZM17.775 13.5C17.3583 13.5 17.0043 13.354 16.713 13.062C16.421 12.7707 16.275 12.4167 16.275 12C16.275 11.5833 16.421 11.2293 16.713 10.938C17.0043 10.646 17.3583 10.5 17.775 10.5C18.1916 10.5 18.546 10.646 18.838 10.938C19.1293 11.2293 19.275 11.5833 19.275 12C19.275 12.4167 19.1293 12.7707 18.838 13.062C18.546 13.354 18.1916 13.5 17.775 13.5Z"
              fill="white"
            />
          </svg>
          {(() => {
            if (showOptions === contact.id) {
              return (
                <div className="absolute z-50 flex flex-col bg-[#1E1E1E] ml-[-187px] md:ml-[-8px] mt-4 min-w-[219px] rounded-lg overflow-clip">
                  <div
                    className="flex flex-row items-center px-[10px] py-3 bg-transparent hover:bg-[#232323]"
                    onClick={() => {
                      setEditModalOpen(true);
                      setShowOptions(undefined);
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.08342 17.9168L7.75008 15.3752C7.52786 15.3057 7.3023 15.2016 7.07342 15.0627C6.84397 14.9238 6.63203 14.7779 6.43758 14.6252L4.08342 15.6252L2.16675 12.2918L4.20842 10.7502C4.18064 10.6252 4.16341 10.5002 4.15675 10.3752C4.14953 10.2502 4.14591 10.1252 4.14591 10.0002C4.14591 9.88905 4.14953 9.771 4.15675 9.646C4.16341 9.521 4.18064 9.38905 4.20842 9.25016L2.16675 7.7085L4.08342 4.396L6.43758 5.37516C6.63203 5.22238 6.84397 5.08016 7.07342 4.9485C7.3023 4.81627 7.52786 4.7085 7.75008 4.62516L8.08342 2.0835H11.9167L12.2501 4.62516C12.5001 4.72239 12.7256 4.82988 12.9268 4.94766C13.1284 5.066 13.3334 5.2085 13.5417 5.37516L15.9167 4.396L17.8334 7.7085L15.7709 9.271C15.7987 9.40988 15.8126 9.53488 15.8126 9.646C15.8126 9.75711 15.8126 9.87516 15.8126 10.0002C15.8126 10.1113 15.809 10.2257 15.8017 10.3435C15.7951 10.4618 15.7779 10.5974 15.7501 10.7502L17.7917 12.2918L15.8751 15.6252L13.5417 14.6252C13.3334 14.7918 13.1217 14.9377 12.9067 15.0627C12.6912 15.1877 12.4723 15.2918 12.2501 15.3752L11.9167 17.9168H8.08342ZM10.0001 12.5002C10.6945 12.5002 11.2848 12.2571 11.7709 11.771C12.257 11.2849 12.5001 10.6946 12.5001 10.0002C12.5001 9.30572 12.257 8.71544 11.7709 8.22933C11.2848 7.74322 10.6945 7.50016 10.0001 7.50016C9.30564 7.50016 8.71536 7.74322 8.22925 8.22933C7.74314 8.71544 7.50008 9.30572 7.50008 10.0002C7.50008 10.6946 7.74314 11.2849 8.22925 11.771C8.71536 12.2571 9.30564 12.5002 10.0001 12.5002ZM10.0001 11.2502C9.65286 11.2502 9.35786 11.1285 9.11508 10.8852C8.87175 10.6424 8.75008 10.3474 8.75008 10.0002C8.75008 9.65294 8.87175 9.35794 9.11508 9.11516C9.35786 8.87183 9.65286 8.75016 10.0001 8.75016C10.3473 8.75016 10.6423 8.87183 10.8851 9.11516C11.1284 9.35794 11.2501 9.65294 11.2501 10.0002C11.2501 10.3474 11.1284 10.6424 10.8851 10.8852C10.6423 11.1285 10.3473 11.2502 10.0001 11.2502ZM9.16675 16.6668H10.8126L11.1042 14.4377C11.5348 14.3266 11.9237 14.1668 12.2709 13.9585C12.6181 13.7502 12.9584 13.4863 13.2917 13.1668L15.3542 14.0418L16.1876 12.6252L14.3751 11.271C14.4445 11.0488 14.4898 10.8335 14.5109 10.6252C14.5315 10.4168 14.5417 10.2085 14.5417 10.0002C14.5417 9.77794 14.5315 9.56627 14.5109 9.36516C14.4898 9.1635 14.4445 8.9585 14.3751 8.75016L16.1876 7.37516L15.3751 5.9585L13.2709 6.8335C12.9931 6.54183 12.6598 6.28127 12.2709 6.05183C11.882 5.82294 11.4931 5.65989 11.1042 5.56266L10.8334 3.3335H9.18758L8.89592 5.56266C8.47925 5.65989 8.09036 5.81266 7.72925 6.021C7.36814 6.22933 7.02092 6.49322 6.68758 6.81266L4.62508 5.9585L3.81258 7.37516L5.60425 8.7085C5.5348 8.91683 5.48619 9.12516 5.45842 9.3335C5.43064 9.54183 5.41675 9.76405 5.41675 10.0002C5.41675 10.2224 5.43064 10.4377 5.45842 10.646C5.48619 10.8543 5.5348 11.0627 5.60425 11.271L3.81258 12.6252L4.62508 14.0418L6.68758 13.1668C7.00703 13.4863 7.3473 13.7502 7.70842 13.9585C8.06953 14.1668 8.46536 14.3266 8.89592 14.4377L9.16675 16.6668Z"
                        fill="white"
                        fillOpacity="0.56"
                      />
                    </svg>
                    Edit
                  </div>
                  <div
                    className="flex flex-row items-center px-[10px] py-3 bg-transparent hover:bg-[#232323]"
                    onClick={() => {
                      setShowOptions(undefined);
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.99992 16.9375L9.06242 16.1042C6.95131 14.2014 5.2602 12.5486 3.98909 11.1458C2.71853 9.74306 2.08325 8.29167 2.08325 6.79167C2.08325 5.61111 2.4827 4.62139 3.28159 3.8225C4.07992 3.02417 5.06936 2.625 6.24992 2.625C6.91658 2.625 7.57992 2.78111 8.23992 3.09333C8.89936 3.40611 9.48603 3.90972 9.99992 4.60417C10.5138 3.90972 11.1008 3.40611 11.7608 3.09333C12.4202 2.78111 13.0833 2.625 13.7499 2.625C14.9305 2.625 15.9199 3.02417 16.7183 3.8225C17.5171 4.62139 17.9166 5.61111 17.9166 6.79167C17.9166 8.29167 17.281 9.74306 16.0099 11.1458C14.7394 12.5486 13.0485 14.2014 10.9374 16.1042L9.99992 16.9375ZM9.99992 15.25C11.986 13.4444 13.5938 11.8889 14.8233 10.5833C16.0521 9.27778 16.6666 8.01389 16.6666 6.79167C16.6666 5.95833 16.3888 5.26389 15.8333 4.70833C15.2777 4.15278 14.5833 3.875 13.7499 3.875C13.0971 3.875 12.493 4.05556 11.9374 4.41667C11.3819 4.77778 10.9374 5.30556 10.6041 6H9.39575C9.06242 5.30556 8.61797 4.77778 8.06242 4.41667C7.50686 4.05556 6.9027 3.875 6.24992 3.875C5.41659 3.875 4.72214 4.15278 4.16659 4.70833C3.61103 5.26389 3.33325 5.95833 3.33325 6.79167C3.33325 8.01389 3.94797 9.27778 5.17742 10.5833C6.40631 11.8889 8.01381 13.4444 9.99992 15.25Z"
                        fill="white"
                        fillOpacity="0.56"
                      />
                    </svg>
                    Favourite
                  </div>
                  <div
                    className="flex flex-row items-center px-[10px] py-3 bg-transparent hover:bg-[#232323]"
                    onClick={() => {
                      deleteContact(contact.id);
                      setShowOptions(undefined);
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.91667 15.8332H13.0833C13.1389 15.8332 13.1944 15.8054 13.25 15.7498C13.3056 15.6943 13.3333 15.6387 13.3333 15.5832V7.49984H6.66667V15.5832C6.66667 15.6387 6.69444 15.6943 6.75 15.7498C6.80556 15.8054 6.86111 15.8332 6.91667 15.8332ZM4.6875 5.24984V3.99984H7.16667L8 3.1665H12L12.8333 3.99984H15.3125V5.24984H4.6875ZM6.91667 17.0832C6.5 17.0832 6.14583 16.9373 5.85417 16.6457C5.5625 16.354 5.41667 15.9998 5.41667 15.5832V6.24984H14.5833V15.5832C14.5833 15.9998 14.4375 16.354 14.1458 16.6457C13.8542 16.9373 13.5 17.0832 13.0833 17.0832H6.91667ZM6.66667 15.8332H13.3333C13.3333 15.8332 13.3056 15.8332 13.25 15.8332C13.1944 15.8332 13.1389 15.8332 13.0833 15.8332H6.91667C6.86111 15.8332 6.80556 15.8332 6.75 15.8332C6.69444 15.8332 6.66667 15.8332 6.66667 15.8332Z"
                        fill="white"
                        fillOpacity="0.56"
                      />
                    </svg>
                    Delete
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })()}
        </motion.div>
      </div>
      <EditModal
        handleEditModalClose={handleEditModalClose}
        isOpen={editModalOpen}
        id={contact.id}
      />
    </div>
  );
};

export default ListItem;
