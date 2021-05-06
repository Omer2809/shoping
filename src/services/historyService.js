import http from "./httpService";
// import { apiUrl } from "../config.json";

const apiEndpoint = "/history";

function productUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getProductHistory() {
  return http.get(apiEndpoint);
}

export function saveProductHistory(history) {
  return http.post(apiEndpoint, { ...history });
}

export function deleteHistory(productId) {
  return http.delete(productUrl(productId));
}
