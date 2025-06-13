import { ref } from "vue";
import Cookies from "js-cookie";

export async function useFetch<T = any>(url: string, method: string, dataJson?: object) {
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);

  try {
    const csrfToken = decodeURIComponent(Cookies.get("XSRF-TOKEN") || "");
    const token = decodeURIComponent(Cookies.get("api-token") || "");
  
    const options: RequestInit = {
      credentials: "include",
      method: method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": csrfToken,
        Authorization: `Bearer ${token}`,
      },
    };

    if (dataJson && method !== "GET") {
      options.body = JSON.stringify(dataJson);
    }

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, options);

    if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);

    data.value = await res.json();
  } catch (e: any) {
    error.value = e.message;
  }

  return { data, error };
}
