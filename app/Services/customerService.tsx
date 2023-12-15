import React from "react";
import axios, { AxiosResponse } from "axios";
import { Customer } from "../Types/types";

const API_URL = "https://localhost:7272/api";
const BASE_URL = "https://localhost:7272/api/Customer";

export const createCustomer = async (customer: Customer): Promise<void> => {
  try {
    const response = await axios.post(`${API_URL}/Customer`, customer);

    if (response.status === 200) {
      console.log("Cliente cadastrado com sucesso!");
    } else {
      console.error("Falha ao cadastrar o cliente.");
    }
  } catch (error) {
    console.error("Erro ao cadastrar o cliente:");
    throw error;
  }
};

export const getCustomers = async (): Promise<Customer[]> => {
  const url = "https://localhost:7272/api/Customer";

  try {
    const response: AxiosResponse<Customer[]> = await axios.get<Customer[]>(
      url
    );
    return response.data;
  } catch (error) {
    console.error("Error getting customers:");
    throw error;
  }
};

export const editCustomer = async (customer: {
  name: string;
  idDocument: string;
  id: string;
}): Promise<Customer> => {
  const url = `${BASE_URL}/${customer.id}`;

  try {
    const response: AxiosResponse<Customer> = await axios.put(url, customer, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao editar o cliente:", error);
    throw error;
  }
};

export const deleteCustomer = async (customerId: string): Promise<void> => {
  const url = `${BASE_URL}/${customerId}`;

  try {
    await axios.delete(url);
    console.log("Cliente excluído com sucesso");
  } catch (error) {
    console.error("Erro ao excluir o cliente:", error);
    throw error;
  }
};
