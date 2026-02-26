import { api } from "./api";

export const productsService = {
    list: ( { page = 1, limit = 10, search ="", category = "", sort = "-price" } ) => {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));

        if (search) params.set("search", search);
        if (category) params.set("category", category);
        if (sort) params.set("sort", sort);

        return api.get(`/api/products?${params.toString()}`);
    },

    create: (payload) => api.post("/api/products", payload),
    update: (id, payload) => api.put(`/api/products/${id}`, payload),
    remove: (id) => api.del(`/api/products/${id}`),
    getById: (id) => api.get(`/api/products/${id}`),
};