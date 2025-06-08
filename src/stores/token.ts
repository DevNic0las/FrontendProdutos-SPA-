import { defineStore } from "pinia";
import { ref, watch } from "vue";
import Cookies from "js-cookie";

export const useStoreUser = defineStore("user", () => {
  // Pega o token do cookie, ou null
  const token = ref(Cookies.get("api-token") || null);

  function setToken(newToken: string) {
    token.value = newToken;
  }

  function clearToken() {
    token.value = null;
  }

  watch(token, (newToken) => {
    if (newToken) {
      // Salva cookie com expiração de 7 dias
      Cookies.set("api-token", newToken, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
    } else {
      Cookies.remove("api-token");
    }
  });

  return { token, setToken, clearToken };
});
