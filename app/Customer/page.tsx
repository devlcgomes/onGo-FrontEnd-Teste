"use client";
import React, { useEffect, useState } from "react";
import { Customer as CustomerType } from "../Types/types";

import {
  createCustomer,
  getCustomers,
  editCustomer,
  deleteCustomer,
} from "../Services/customerService";

const Customer = () => {
  const [name, setName] = useState("");
  const [idDocument, setIdDocument] = useState("");
  const [customers, setCustomers] = useState<CustomerType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerType | null>(
    null
  );
  const [deletingCustomer, setDeletingCustomer] = useState<CustomerType | null>(
    null
  );

  const handleCreateNewCustomer = async () => {
    try {
      await createCustomer({
        name,
        idDocument,
      });
      fetchCustomers();
    } catch (error) {
      alert("Insira o nome e um CPF Válido, incluindo pontos e hífen.");
    }
  };

  const fetchCustomers = async () => {
    try {
      const fetchedCustomers = await getCustomers();
      setCustomers(fetchedCustomers);
    } catch (error) {}
  };

  const handleEditCustomer = (customer: CustomerType) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleSaveEditedCustomer = async () => {
    try {
      if (editingCustomer) {
        const { id, name, idDocument } = editingCustomer;
        if (id && name && idDocument) {
          await editCustomer({
            id,
            name,
            idDocument,
          });
          fetchCustomers();
          setIsEditModalOpen(false);
          setIsModalOpen(false);
        } else {
        }
      }
    } catch (error) {}
  };

  const handleDeleteCustomer = (customer: CustomerType) => {
    setDeletingCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (deletingCustomer && deletingCustomer.id) {
        await deleteCustomer(deletingCustomer.id);
        fetchCustomers();
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.log("Erro ao excluir o cliente.");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <div className="w-full bg-primary block">
        <div className="container mx-auto mt-4 p-10 relative">
          <h1 className="text-2xl">Cadastro de Clientes</h1>
        </div>
      </div>
      <div className="container mx-auto relative bottom-6">
        <div className=" flex  items-end gap-8 shadow-lg bg-white p-10  w-full">
          <div className="">
            <label
              htmlFor="name"
              className=" block mb-2 text-textLightGray uppercase"
            >
              Nome:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Digite o nome"
              className="w-full p-2 border"
            />
          </div>
          <div className="">
            <label
              htmlFor="document"
              className="text-textLightGray uppercase block mb-2"
            >
              Documento:
            </label>
            <input
              type="text"
              id="document"
              value={idDocument}
              onChange={(e) => setIdDocument(e.target.value)}
              placeholder="Digite o CPF"
              className="w-full p-2 border"
            />
          </div>
          <button
            onClick={handleCreateNewCustomer}
            className=" bg-primary text-textDarkGray px-8 py-2.5 rounded"
          >
            Cadastrar Cliente
          </button>
        </div>
      </div>

      <div className="container mx-auto">
        <h2 className="mb-4 text-center">Lista de Clientes:</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-b border-gray-200 mb-4">
            <thead>
              <tr className="text-textDarkGray">
                <th className="py-2 px-4 bg-gray-100 text-left">Nome</th>
                <th className="py-2 px-4 bg-gray-100 text-left">
                  Número do Documento
                </th>
                <th className="py-2 px-4 bg-gray-100 text-left">Tipo</th>
                <th className="py-2 px-4 bg-gray-100 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((p) => (
                <tr key={p.id}>
                  <td className="py-2 px-4">{p.name}</td>
                  <td className="py-2 px-4">{p.idDocument}</td>
                  <td className="py-2 px-4 text-left">
                    <span className="bg-success p-1 pl-3 pr-3 rounded-sm text-textDarkGreen">
                      Ativo
                    </span>
                  </td>
                  <td className="py-2 px-4 text-right">
                    <button
                      onClick={() => handleEditCustomer(p)}
                      className="bg-primary text-white px-4 py-1 rounded mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteCustomer(p)}
                      className="bg-red-500 text-white px-4 py-1 rounded"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && editingCustomer && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Fundo do modal */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Conteúdo do modal */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Editar Produto
                    </h3>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={editingCustomer?.name}
                        onChange={(e) =>
                          setEditingCustomer({
                            ...editingCustomer,
                            name: e.target.value,
                          })
                        }
                        className="w-full p-2 border"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSaveEditedCustomer}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botão de Exclusão e Modal de Confirmação */}
      {isDeleteModalOpen && deletingCustomer && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Confirmar Exclusão
                    </h3>
                    <p className="mt-2 text-gray-500">
                      Tem certeza de que deseja excluir o cliente{" "}
                      <strong>{deletingCustomer.name}</strong>?
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleConfirmDelete}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-white font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Excluir
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Customer;
