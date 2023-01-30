"use client";

import { useState } from "react";

import { glysa } from "@/app/layout";

import { motion } from "framer-motion";

import AddModal from "../AddModal/AddModal";

const UpperComponent: React.FC = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Handle modal close
  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  return (
    <div className="flex flex-row justify-between w-full p-6 border-b border-[#282828]">
      <h1 className={glysa.className + " text-[32px] leading-[48px]"}>
        Contacts
      </h1>
      <div className="flex flex-row items-center">
        <div className="p-2 mr-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.69998 21.5L9.29998 18.45C9.03331 18.3667 8.76264 18.2417 8.48798 18.075C8.21264 17.9083 7.95831 17.7333 7.72498 17.55L4.89998 18.75L2.59998 14.75L5.04998 12.9C5.01664 12.75 4.99598 12.6 4.98798 12.45C4.97931 12.3 4.97498 12.15 4.97498 12C4.97498 11.8667 4.97931 11.725 4.98798 11.575C4.99598 11.425 5.01664 11.2667 5.04998 11.1L2.59998 9.25L4.89998 5.275L7.72498 6.45C7.95831 6.26667 8.21264 6.096 8.48798 5.938C8.76264 5.77933 9.03331 5.65 9.29998 5.55L9.69998 2.5H14.3L14.7 5.55C15 5.66667 15.2706 5.79567 15.512 5.937C15.754 6.079 16 6.25 16.25 6.45L19.1 5.275L21.4 9.25L18.925 11.125C18.9583 11.2917 18.975 11.4417 18.975 11.575C18.975 11.7083 18.975 11.85 18.975 12C18.975 12.1333 18.9706 12.2707 18.962 12.412C18.954 12.554 18.9333 12.7167 18.9 12.9L21.35 14.75L19.05 18.75L16.25 17.55C16 17.75 15.746 17.925 15.488 18.075C15.2293 18.225 14.9666 18.35 14.7 18.45L14.3 21.5H9.69998ZM12 15C12.8333 15 13.5416 14.7083 14.125 14.125C14.7083 13.5417 15 12.8333 15 12C15 11.1667 14.7083 10.4583 14.125 9.875C13.5416 9.29167 12.8333 9 12 9C11.1666 9 10.4583 9.29167 9.87498 9.875C9.29164 10.4583 8.99998 11.1667 8.99998 12C8.99998 12.8333 9.29164 13.5417 9.87498 14.125C10.4583 14.7083 11.1666 15 12 15ZM12 13.5C11.5833 13.5 11.2293 13.354 10.938 13.062C10.646 12.7707 10.5 12.4167 10.5 12C10.5 11.5833 10.646 11.2293 10.938 10.938C11.2293 10.646 11.5833 10.5 12 10.5C12.4166 10.5 12.7706 10.646 13.062 10.938C13.354 11.2293 13.5 11.5833 13.5 12C13.5 12.4167 13.354 12.7707 13.062 13.062C12.7706 13.354 12.4166 13.5 12 13.5ZM11 20H12.975L13.325 17.325C13.8416 17.1917 14.3083 17 14.725 16.75C15.1416 16.5 15.55 16.1833 15.95 15.8L18.425 16.85L19.425 15.15L17.25 13.525C17.3333 13.2583 17.3876 13 17.413 12.75C17.4376 12.5 17.45 12.25 17.45 12C17.45 11.7333 17.4376 11.4793 17.413 11.238C17.3876 10.996 17.3333 10.75 17.25 10.5L19.425 8.85L18.45 7.15L15.925 8.2C15.5916 7.85 15.1916 7.53733 14.725 7.262C14.2583 6.98733 13.7916 6.79167 13.325 6.675L13 4H11.025L10.675 6.675C10.175 6.79167 9.70831 6.975 9.27498 7.225C8.84164 7.475 8.42498 7.79167 8.02498 8.175L5.54998 7.15L4.57498 8.85L6.72498 10.45C6.64164 10.7 6.58331 10.95 6.54998 11.2C6.51664 11.45 6.49998 11.7167 6.49998 12C6.49998 12.2667 6.51664 12.525 6.54998 12.775C6.58331 13.025 6.64164 13.275 6.72498 13.525L4.57498 15.15L5.54998 16.85L8.02498 15.8C8.40831 16.1833 8.81664 16.5 9.24998 16.75C9.68331 17 10.1583 17.1917 10.675 17.325L11 20Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="p-2 mr-6">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g clipPath="url(#clip0_2698_218)">
              <circle
                cx="12"
                cy="12"
                r="10.75"
                fill="url(#pattern0)"
                stroke="white"
                strokeWidth="1.5"
              />
            </g>
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlinkHref="#image0_2698_218"
                  transform="translate(-0.0767836 -0.0231012) scale(0.000671699)"
                />
              </pattern>
              <clipPath id="clip0_2698_218">
                <rect width="24" height="24" fill="white" />
              </clipPath>
              <image
                id="image0_2698_218"
                width="2158"
                height="2158"
                alignmentBaseline="middle"
                xlinkHref="https://res.cloudinary.com/df4tacw8n/image/upload/v1674861458/Default_gvmikh.jpg"
              />
            </defs>
          </svg>
        </div>
        <div
          className="py-2 pl-3 pr-4 rounded-full cursor-pointer border border-[#3C3C3C] bg-[#141414] bg-gradient-to-b from-[rgba(40,40,40,0.7)] to-[#282828] hover:from-[rgba(40,40,40,0.7)] hover:to-[#282828] hover:bg-[rgba(255,255,255,0.04)] active:from-[rgba(40,40,40,0.7)] active:to-[#282828] active:bg-[rgba(255,255,255,0.04)]"
          onClick={() => setAddModalOpen(true)}
        >
          <motion.div
            initial={{ opacity: 0.6 }}
            whileTap={{ scale: 0.9 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-row items-center justify-between"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="mr-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.25 18.75V12.75H5.25V11.25H11.25V5.25H12.75V11.25H18.75V12.75H12.75V18.75H11.25Z"
                fill="white"
              />
            </svg>
            <span>Add new</span>
          </motion.div>
        </div>
      </div>
      {addModalOpen ? (
        <AddModal
          handleAddModalClose={handleAddModalClose}
          isOpen={addModalOpen}
        />
      ) : null}
    </div>
  );
};

export default UpperComponent;
