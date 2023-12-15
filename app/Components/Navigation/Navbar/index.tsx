import Link from "next/link";
import React from "react";
import Logo from "../../Logo";
import Avatar from "../../Avatar";

const Navbar = () => {
  return (
    <>
      <div className="w-full h-20 bg-white sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Logo />
            <ul className="hidden md:flex gap-x-6 text-texGray">
              <li>
                <Link href="/">
                  <p>Página Inicial</p>
                </Link>
              </li>
              <li>
                <Link href="/Customer">
                  <p>Clientes</p>
                </Link>
              </li>
              <li>
                <Link href="/Product">
                  <p>Produtos</p>
                </Link>
              </li>
              <li>
                <Link href="/Inventory">
                  <p>Inventário</p>
                </Link>
              </li>
            </ul>
            <Avatar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
