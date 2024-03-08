import { z } from "zod";
import { create } from "zustand";
import {
  CategorySchema,
  CategoryListSchema,
  CategoryFormFieldsValueSchema,
} from "./validation";
import { Color_rgba, SetCategoryResponse } from "./types";
import { keywordsArrayToKeywordString } from "../actions/keywordsArrayToKeywordString";
import { rgbaStringToRgbaObjcet } from "../actions/rgbaStringToRgbaObjcet";

//green
const defaultColor: Color_rgba = {
  r: 20,
  g: 141,
  b: 14,
  a: 1,
};

interface Store {
  isEditing: boolean;
  setIsEditing: (isOn: boolean) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOn: boolean) => void;
  formInitialData: z.infer<typeof CategoryFormFieldsValueSchema>;
  setFormInitialData: (catId: string) => void;
  resetFormInitialData: () => void;
  categorys: z.infer<typeof CategoryListSchema>;
  createCategory: (
    category: z.infer<typeof CategorySchema>
  ) => SetCategoryResponse;
  getCategorys: () => void;
  editCategory: (
    category: z.infer<typeof CategorySchema>
  ) => SetCategoryResponse;
}

export const useCategoryStore = create<Store>((set, get) => ({
  categorys: [],
  isEditing: false,
  isModalOpen: false,
  setIsModalOpen: (isOpen) => {
    set(() => ({ isModalOpen: isOpen }));
  },
  setIsEditing: (isEditing) => {
    set(() => ({ isEditing: isEditing }));
  },
  formInitialData: {
    id: Math.random().toString(),
    title: "",
    color: { ...defaultColor, metaColor: defaultColor },
    description: "",
    keywords: "",
  },
  resetFormInitialData: () => {
    set(() => ({
      isEditing: false,
      formInitialData: {
        id: Math.random().toString(),
        title: "",
        color: { ...defaultColor, metaColor: defaultColor },
        description: "",
        keywords: "",
      },
    }));
  },
  setFormInitialData: (catId) => {
    set((state) => {
      const selectedCatValue = state.categorys.find((cat) => cat.id === catId);
      const validate = CategorySchema.safeParse(selectedCatValue);
      if (!validate.success) {
        return { formInitialData: state.formInitialData, isEditing: false };
      }
      const color = rgbaStringToRgbaObjcet(validate.data.color);
      if (!color) {
        return { formInitialData: state.formInitialData, isEditing: false };
      }
      const keywords: string = keywordsArrayToKeywordString(
        validate.data.keywords
      );
      return {
        isEditing: true,
        formInitialData: {
          id: validate.data.id,
          color: { ...color, metaColor: color },
          description: validate.data.description,
          keywords: keywords,
          title: validate.data.title,
        },
      };
    });
  },
  getCategorys: () => {
    try {
      let sessionData: z.infer<typeof CategoryListSchema> = JSON.parse(
        sessionStorage.getItem("category") || "[]"
      );
      const validateSessionData = CategoryListSchema.safeParse(sessionData);
      if (!validateSessionData.success) {
        sessionData = [];
        sessionStorage.removeItem("category");
      }
      set(() => ({ categorys: sessionData }));
    } catch (error) {
      set(() => ({ categorys: [] }));
    }
  },
  createCategory: (category) => {
    try {
      set((state) => {
        sessionStorage.setItem(
          "category",
          JSON.stringify([...state.categorys, category])
        );
        return { categorys: [...state.categorys, category] };
      });
      return {
        status: "Success",
        message: "category created successfully",
        ok: true,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          status: "Error",
          message: error.message,
          ok: false,
        };
      }
      return {
        status: "Error",
        message: "somthing went Wrong",
        ok: false,
      };
    }
  },
  editCategory: (category) => {
    try {
      let response: SetCategoryResponse = {
        status: "Success",
        message: "changes done",
        ok: true,
      };
      set((state) => {
        const itemIndex = state.categorys.findIndex(
          (cat) => cat.id === category.id
        );
        if (itemIndex === -1) {
          response = {
            ok: false,
            message: "this category does not exist on memory",
            status: "Error",
          };
          return {};
        }
        const updatedCategorys = [
          ...state.categorys.slice(0, itemIndex),
          category,
          ...state.categorys.slice(itemIndex + 1),
        ];
        sessionStorage.setItem("category", JSON.stringify(updatedCategorys));
        return { categorys: updatedCategorys };
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return {
          status: "Error",
          message: error.message,
          ok: false,
        };
      }
      return {
        status: "Error",
        message: "somthing went Wrong",
        ok: false,
      };
    }
  },
}));
