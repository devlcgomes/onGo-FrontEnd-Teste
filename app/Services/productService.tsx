import React from "react";
import axios, { AxiosResponse } from "axios";
import { Product } from "../Types/types";
const BASE_URL = "https://localhost:7272/api/Product";

export const createProduct = async (product: {
  name: string;
}): Promise<Product> => {
  const url = "https://localhost:7272/api/Product";

  try {
    const response: AxiosResponse<Product> = await axios.post(url, product, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Produto Criado com sucesso");
    return response.data;
  } catch (error) {
    console.error("Error creating product:");
    throw error;
  }
};

export const getProducts = async (): Promise<Product[]> => {
  const url = "https://localhost:7272/api/Product";

  try {
    const response: AxiosResponse<Product[]> = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Error getting products:");
    throw error;
  }
};

export const editProduct = async (product: Product): Promise<Product> => {
  const url = `https://localhost:7272/api/Product/${product.id}`;

  try {
    const response: AxiosResponse<Product> = await axios.put(url, product, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao editar produto.");
    throw error;
  }
};

export const deleteProduct = async (productId: string): Promise<void> => {
  const url = `${BASE_URL}/${productId}`;

  try {
    await axios.delete(url);
    console.log("Produto excluído com sucesso");
  } catch (error) {
    console.error("Erro ao excluir o produto:", error);
    throw error;
  }
};
