"use client";
import React, { useEffect, useState } from "react";
import CustomModal from "../Components/Modal/CustomModal";
import { Customer as CustomerType } from "@/app/Types/types";
import { getCustomers } from "../Services/customerService";
import { CustomModalProps } from "@/app/Types/types";
import { getProducts } from "../Services/productService";
import { Product } from "@/app/Types/types";
import { getInventories } from "@/app/Services/inventoryService";
import { Inventory as InventoryType } from "@/app/Types/types";

const Inventory = () => {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );
  const [selectedCustomerInventory, setSelectedCustomerInventory] = useState<{
    customerId: string;
    inventory: { id: string; name: string }[];
  } | null>(null);

  const handleCheckInventory = async () => {
    try {
      if (!selectedCustomerId) {
        alert("ID do cliente não fornecido");
        return;
      }

      const existingInventories = await getInventories(selectedCustomerId);

      if (existingInventories.length > 0) {
        const selectedInventory = existingInventories[0];
        setSelectedCustomerInventory({
          customerId: selectedInventory.customerId,
          inventory: selectedInventory.inventory,
        });
      } else {
        setSelectedCustomerInventory(null);
        alert("O Cliente informado não possui inventário.");
      }
    } catch (error) {
      alert("O Cliente informado não possui inventário.");
    }
  };

  const handleOpenAddItemModal = () => {
    setIsAddItemModalOpen(true);
  };

  const handleCloseAddItemModal = () => {
    setIsAddItemModalOpen(false);
  };

  const fetchCustomers = async () => {
    try {
      const fetchedCustomers = await getCustomers();
      setCustomers(fetchedCustomers);
    } catch (error) {
      console.log("Não foi possível obter a lista de clientes;");
    }
  };

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.log("Não foi possível obter a lista de produtos.");
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

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

      {/* Modal Add Items */}
      {isAddItemModalOpen && (
        <CustomModal
          onSave={(customerId) => {
            setSelectedCustomerId(customerId);
            handleCloseAddItemModal();
          }}
          onCancel={handleCloseAddItemModal}
        />
      )}

      <div className="container mx-auto py-4">
        <h1>
          Selecione abaixo o nome do Cliente e em seguida clique em buscar para
          ver seus itens
        </h1>
        <div className="flex items-center py-4">
          <select
            value={selectedCustomerId || ""}
            onChange={(e) => setSelectedCustomerId(e.target.value)}
            className="bg-gray-200 text-gray-800 p-2 rounded mr-2"
          >
            <option value="" disabled>
              Selecione um cliente
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleCheckInventory}
            className="bg-textDarkGreen text-white px-4 py-2 rounded"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Mostrar os itens do cliente */}
      {selectedCustomerInventory && (
        <div className="container mx-auto py-4">
          <h2 className="text-2xl font-bold mb-4">Itens do Cliente</h2>
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <p>
              <span className="font-bold">Nome do Cliente:</span>{" "}
              {
                customers.find(
                  (customer) =>
                    customer.id === selectedCustomerInventory.customerId
                )?.name
              }
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-md p-4">
            <h3 className="text-lg font-bold mb-4">Itens</h3>
            <ul className="list-disc pl-4">
              {selectedCustomerInventory.inventory.map((item) => (
                <li key={item.id} className="mb-2">
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Inventory;
