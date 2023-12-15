import React from "react";
import ImgBoxes from "@/assets/boxes.png";
import Link from "next/link";

const Homepage = () => {
  return (
    <div className=" w-full p-4 md:p-40">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center mt-4">
        <p className="flex-1 text-2xl font-semibold text-textDarkGray md:mr-8">
          Tenha <span className="text-primary">controle imediato</span> de sua
          operação, deixe de lado ligações, planilhas, e-mails e venha agora
          mesmo
          <span className="text-primary"> operar com alta performance</span> de
          um jeito inovador.
        </p>
        <img
          className="w-full md:w-3/5 mt-4 md:mt-0"
          src={ImgBoxes.src}
          alt="Caixas e dashboard"
        />
      </div>

      <h1 className="text-2xl text-center mt-10">Experimente agora mesmo</h1>
      <div className="mt-10 flex gap-10 mx-auto text-center justify-center">
        <Link
          href="/Customer"
          className="bg-primary p-4 rounded-lg font-semibold"
        >
          Cadastrar Clientes
        </Link>
        <Link
          href="/Product"
          className="bg-primary p-4 rounded-lg font-semibold"
        >
          Cadastrar Produtos
        </Link>
        <Link
          href="/Inventory"
          className="bg-primary p-4 rounded-lg font-semibold"
        >
          Visualizar Inventário
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
