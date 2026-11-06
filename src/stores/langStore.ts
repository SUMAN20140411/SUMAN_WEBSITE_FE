// 언어상태 store
import { create } from "zustand";

interface LangStore {
  lang: "KOR" | "ENG";
  setLang: (lang: "KOR" | "ENG") => void;
}

export const useLangStore = create<LangStore>((set) => ({
  lang: "KOR",
  setLang: (lang) => set({ lang }),
}));
