"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../Types/types";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../Services/productService";

const Product = () => {
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {}
  };

  const handleCreateNewProduct = async () => {
    try {
      if (!productName.trim()) {
        alert("O nome do produto não pode estar vazio.");
        return;
      }

      await createProduct({
        name: productName,
      });

      fetchProducts();
    } catch (error) {}
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setDeletingProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEditedProduct = async () => {
    try {
      if (editingProduct) {
        await editProduct(editingProduct);
        fetchProducts();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (deletingProduct && deletingProduct.id) {
        await deleteProduct(deletingProduct.id);
        fetchProducts();
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="w-full bg-textDarkGray block">
        <div className="container mx-auto mt-4 p-10 relative">
          <h1 className="text-2xl text-white">Cadastrar Produto</h1>
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
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              type="text"
              id="name"
              placeholder="Digite o nome do produto"
              className="w-full p-2 border"
            />
          </div>
          <button
            onClick={handleCreateNewProduct}
            className=" bg-textDarkGray  text-white px-8 py-2.5 rounded"
          >
            Cadastrar Produto
          </button>
        </div>
      </div>

      <div className="container mx-auto">
        <h2 className="mb-4 text-center">Lista de Produtos</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-b border-gray-200 mb-4">
            <thead>
              <tr className="text-textDarkGray">
                <th className="py-2 px-4 bg-gray-100 text-left">Nome</th>
                <th className="py-2 px-4 bg-gray-100 text-left">Código</th>
                <th className="py-2 px-4 bg-gray-100 text-right">Situação</th>
                <th className="py-2 px-4 bg-gray-100 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="py-2 px-4">{p.name}</td>
                  <td className="py-2 px-4">{p.id}</td>
                  <td className="py-2 px-4 text-right">
                    <span className="bg-success p-1 pl-3 pr-3 rounded-sm text-textDarkGreen">
                      Ativo
                    </span>
                  </td>
                  <td className="py-2 px-4 text-right">
                    <button
                      onClick={() => handleEditProduct(p)}
                      className="bg-primary text-white px-4 py-1 rounded mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p)}
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

      {isModalOpen && editingProduct && (
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
                        value={editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
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
                  onClick={handleSaveEditedProduct}
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
      {isDeleteModalOpen && deletingProduct && (
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
                      Tem certeza de que deseja excluir o produto{" "}
                      <strong>{deletingProduct.name}</strong>?
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

export default Product;
