"use client";
import React, { useEffect, useState } from "react";
import CustomModal from "../Components/Modal/CustomModal";
import { Customer as CustomerType } from "@/app/Types/types";
import { getCustomers } from "../Services/customerService";
import { CustomModalProps } from "@/app/Types/types";
import { getProducts } from "../Services/productService";
import { Product } from "@/app/Types/types";
import { getInventories, saveInventory } from "@/app/Services/inventoryService";
import { Inventory } from "@/app/Types/types";

const Inventory = () => {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [inventories, setInventories] = useState<Inventory[]>([]);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        // Aqui, você precisa obter o customerId de alguma forma
        const customerId = "c9a12995-19ee-49e8-a64e-08ed1983b9c0";
        const fetchedInventories = await getInventories(customerId);
        setInventories(fetchedInventories);
      } catch (error) {
        console.error("Erro ao buscar inventários:", error);
      }
    };

    fetchInventories();
  }, []);

  const openCustomModal = (): Promise<string | null> => {
    // Implemente a lógica do seu modal aqui
    // Pode ser um formulário, uma caixa de diálogo, etc.
    // Por enquanto, vou apenas retornar um valor fixo para fins de exemplo
    return new Promise((resolve) => {
      const customerId = "c9a12995-19ee-49e8-a64e-08ed1983b9c0";
      resolve(customerId);
    });
  };

  const handleOpenAddItemModal = async () => {
    try {
      // Abra o modal e aguarde o customerId
      const customerId = await openCustomModal();

      if (customerId) {
        const existingInventories = await getInventories(customerId);

        if (existingInventories.length > 0) {
          // Cliente já possui inventário
          console.log("Cliente já possui inventário:", existingInventories);
        } else {
          // Cliente não possui inventário, então abra o modal de adicionar item
          setIsAddItemModalOpen(true);
        }
      } else {
        // O usuário cancelou ou ocorreu algum erro ao obter o customerId
        console.log("Operação cancelada ou erro ao obter o customerId");
      }
    } catch (error) {
      console.error("Erro ao verificar inventário do cliente:", error);
    }
  };

  const handleCloseAddItemModal = () => {
    // Lógica para fechar o modal de adicionar item
    setIsAddItemModalOpen(false);
  };

  const fetchCustomers = async () => {
    try {
      const fetchedCustomers = await getCustomers();
      setCustomers(fetchedCustomers);
    } catch (error) {
      console.log("não foi possível fazer o get;", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.log("Não foi possível fazer o get de produtos.", error);
    }
  };

  const handleSaveInventory = async () => {
    try {
      // Lógica para lidar com o salvamento do inventário
      // Aqui você deve obter os produtos selecionados, customerId, etc.
      const customerId = "c9a12995-19ee-49e8-a64e-08ed1983b9c0"; // Substitua pelo valor correto

      // Supondo que você tenha os IDs dos produtos selecionados em um array chamado selectedProductIds
      const selectedProductIds: string[] = [];

      // Chame a função do serviço para salvar o inventário
      await saveInventory(customerId, selectedProductIds);

      // Atualize a lista de inventários após o salvamento, se necessário
      const updatedInventories = await getInventories(customerId);
      setInventories(updatedInventories);

      // Feche o modal
      handleCloseAddItemModal();

      console.log("Inventário salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar o inventário:", error);
    }
  };

  useEffect(() => {
    // Busque a lista de clientes quando o componente montar
    fetchCustomers();
    fetchProducts();
  }, []); // O array vazio assegura que o efeito só é executado uma vez, equivalente a componentDidMount

  console.log(inventories);
  return (
    <>
      <div className="w-full bg-green-600 block">
        <div className="container mx-auto mt-4 p-10 relative">
          <h1 className="text-2xl text-white">Inventários</h1>
        </div>
      </div>
      <div className="container mx-auto relative bottom-6">
        <div className="flex items-end gap-8 shadow-lg bg-white p-10 w-full">
          <button
            onClick={handleOpenAddItemModal}
            className="bg-textDarkGray text-white px-8 py-2.5 rounded"
          >
            Cadastrar Lista de Itens
          </button>
        </div>
      </div>

      {/* Seu modal de adicionar item aqui */}
      {isAddItemModalOpen && (
        <CustomModal
          onSave={handleSaveInventory}
          onCancel={handleCloseAddItemModal}
        />
      )}

      <div>
        <h2>Inventários</h2>
        <ul>
          {inventories.map((inventory) => (
            <li key={inventory.id}>
              <strong>Cliente ID:</strong> {inventory.customerId},{" "}
              <strong>Produto ID:</strong> {inventory.productId}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Inventory;
