import { API_URL } from "@/lib/config";
import type { ProductFormData, ProductsResponse } from "@/lib/types";
import { db } from "@/lib/db/index";
import "server-only";

//#region GET

export async function getInventoryProducts() {

  const res = await db.query(`SELECT stock FROM products`);
  return res.rows;

}

export async function getProductsFromParams(
  limit: string,
  page: string,
  query: string,
): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    _limit: limit.toString(),
    _page: page.toString(),
    q: query.toString(),
  });

  try {
    const response = await fetch(`${API_URL}/products/?${params}`).then((res) =>
      res.json(),
    );

    return response;
  } catch {
    throw new Error("Api is down eh");
  }
}

export async function getProductsWithLimitAndPage(
  limit = "5",
  page = "1",
): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    _limit: limit.toString(),
    _page: page.toString(),
  });

  try {
    const response = await fetch(`${API_URL}/products/?${params}`).then((res) =>
      res.json(),
    );

    return await response;
  } catch {
    throw new Error("Api is down eh");
  }
}

export async function getProductsFromQuery(
  query: string,
): Promise<ProductsResponse> {
  try {
    const response = await fetch(`${API_URL}/products/?q=${query}`).then(
      (res) => res.json(),
    );

    return await response;
  } catch {
    throw new Error("Api is down eh");
  }
}

//#endregion

//#region POST

export async function addProduct(newProduct: ProductFormData) {
  const res = await fetch(`${API_URL}/products/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });

  // const data = await res.json();
  // console.log("Added product:", data);

  return res;
}


export async function updateProductById(id: string, product: ProductFormData) {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  return res;
}
//#endregion