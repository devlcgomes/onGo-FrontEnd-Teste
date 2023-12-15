"use client";
import React, { useEffect, useState } from "react";
import { getCustomers } from "@/app/Services/customerService";
import { getProducts } from "@/app/Services/productService";
import { Customer as CustomerType } from "@/app/Types/types";
import { CustomModalProps } from "@/app/Types/types";
import { Product } from "@/app/Types/types";
import { saveInventory } from "@/app/Services/inventoryService";

const CustomModal: React.FC<CustomModalProps> = (props) => {
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | Product>("");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const fetchCustomers = async () => {
    try {
      const fetchedCustomers = await getCustomers();
      setCustomers(fetchedCustomers);
    } catch (error) {}
  };

  const handleCustomerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCustomer(event.target.value);
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(event.target.value);
  };

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.log("Não foi possível fazer o get de produtos.");
    }
  };

  const handleSaveInventory = async () => {
    try {
      if (selectedCustomer && selectedProducts.length > 0) {
        const customerId = selectedCustomer as string;

        const productIds = selectedProducts
          .filter((product) => product && product.id)
          .map((product) => product.id as string);

        await saveInventory(customerId, productIds);

        setSelectedCustomer("");
        setSelectedProducts([]);

        if (props.onSave) {
          props.onSave(customerId);
        }

        alert("Inventário Salvo com sucesso");
      } else {
        alert(
          "Selecione um cliente e adicione produtos à lista antes de salvar o inventário."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const handleAddToList = () => {
    if (selectedProduct) {
      const selectedProductObject = products.find(
        (p) => p.id === selectedProduct
      );

      if (selectedProductObject) {
        setSelectedProducts([...selectedProducts, selectedProductObject]);
        setSelectedProduct("");
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Criação de Listas
                  </h3>
                  <p className="mt-2 text-gray-500">
                    O primeiro passo é selecionar qual o Cliente terá os items
                  </p>
                  <div className="mt-3">
                    <label
                      htmlFor="customerSelect"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Selecione um Cliente:
                    </label>
                    <select
                      id="customerSelect"
                      name="customer"
                      className="mt-1 p-2 border w-full"
                      value={selectedCustomer}
                      onChange={handleCustomerChange}
                    >
                      <option value="">Selecione um Cliente</option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-3">
                    <label
                      htmlFor="productSelect"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Selecione os produtos:
                    </label>
                    <select
                      id="productSelect"
                      name="customer"
                      className="mt-1 p-2 border w-full"
                      value={
                        typeof selectedProduct === "string"
                          ? selectedProduct
                          : ""
                      }
                      onChange={handleProductChange}
                    >
                      <option>Produtos</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="mt-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 sm:w-auto sm:text-sm"
                      onClick={handleAddToList}
                    >
                      Adicionar à Lista
                    </button>
                  </div>
                  {selectedProducts.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-lg font-medium text-gray-900">
                        Itens Selecionados:
                      </h4>
                      <SelectedItemsList items={selectedProducts} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleSaveInventory}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-textDarkGreen text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Salvar Lista
              </button>
              <button
                onClick={props.onCancel}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SelectedItemsList: React.FC<{ items: Product[] }> = ({ items }) => (
  <ol className="mt-3">
    {items.map((item, index) => (
      <li key={index} className="text-gray-500">
        {item.name}
      </li>
    ))}
  </ol>
);

export default CustomModal;
