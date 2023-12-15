"use client";
import { useState } from "react";
import Navbar from "./Navbar";

interface NavigationProps {
  isOpen: boolean;
  toggle: () => void;
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Navbar />
    </>
  );
};

export default Navigation;
