import axios, { AxiosResponse } from "axios";
import { Inventory } from "../Types/types";

const inventoryEndpoint = "https://localhost:7272/api/Inventory";

export const saveInventory = async (
  customerId: string,
  productIds: string[]
) => {
  try {
    const response = await axios.post(
      `${inventoryEndpoint}?customerid=${customerId}`,
      productIds,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Inventário salvo com sucesso:", response.data);
  } catch (error) {
    console.error("Erro ao salvar o inventário:", error);
    throw error;
  }
};

export const getInventories = async (
  customerId: string
): Promise<Inventory[]> => {
  try {
    const response: AxiosResponse<Inventory[]> = await axios.get(
      `${inventoryEndpoint}/${customerId}`
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao obter os inventários:", error);
    throw error;
  }
};
