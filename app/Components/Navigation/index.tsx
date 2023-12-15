"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface NavigationProps {
    isOpen: boolean;
    toggle: () => void
    ;
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Sidebar />
      <Navbar />
    </>
  );
};

export default Navigation;