import { defineStore } from "pinia";

export const useGeneralStore = defineStore("generalStore", {
  state: () => ({
    store: "on",
  }),
});
