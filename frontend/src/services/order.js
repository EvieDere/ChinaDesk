import { api } from "./api";

export const orderData = {
    createOD: (packageID, addonID, stewID, drinksIDQ, payMS) =>
        api.post("/api/order/make-order", {
            packageID,
            addonID,
            stewID,
            drinksIDQ,
            payMS
        })
};

export const readPackages =  {
    readPK: () => api.get("/api/packages/read-products")
};

export const readGuisos = {
    readG: () => api.get("/api/avail/read-inv")
};

export const readDrinks = {
    readD: () => api.get("/api/drinks/read-drinks")
};