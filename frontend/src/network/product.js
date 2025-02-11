import { fetchData } from "./user";

export async function getProducts() {
    const response = await fetchData("/api/v1/product", {
        method: "GET",
    });

    return response.json();
}

export async function getProductById(id) {
    const response = await fetchData(`/api/v1/product/${id}`, {
        method: "GET",
    });

    return response.json();
}