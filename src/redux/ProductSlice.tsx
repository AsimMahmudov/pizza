import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReduxType {
  _id: string;
  title: string;
  url: string;
  price: number;
  description: string;
  quantity: number;
  kcal: number;
  protein: number;
  fats: number;
  carbohydrates: number;
  weight: number;
}

interface ProductType {
  products: ReduxType[];
  basket: ReduxType[];
}

const initialState: ProductType = {
  products: [],
  basket:
    typeof window !== "undefined" && localStorage.getItem("basket")
      ? JSON.parse(localStorage.getItem("basket") || "[]")
      : [],
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    AddProduct(state, action: PayloadAction<ReduxType[]>) {
      state.products = action.payload;
    },
    RemoveProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    AddBasket(state, action: PayloadAction<ReduxType>) {
      const productInBasket = state.basket.find(
        (item) => item._id === action.payload._id
      );
      if (productInBasket) {
        productInBasket.quantity += 1;
      } else {
        state.basket.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    RemoveFromBasket(state, action: PayloadAction<string>) {
      const index = state.basket.findIndex(
        (item) => item._id === action.payload
      );
      if (index !== -1) {
        const product = state.basket[index];
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          product.quantity = 1;
        }
        localStorage.setItem("basket", JSON.stringify(state.basket));
      }
    },
    DeleteItem(state, action: PayloadAction<string>) {
      state.basket = state.basket.filter((item) => item._id !== action.payload);
      localStorage.setItem("basket", JSON.stringify(state.basket));
    },
    ClearBasket(state) {
      state.basket = [];
      localStorage.removeItem("basket");
    },
  },
});

export const {
  AddProduct,
  RemoveProduct,
  AddBasket,
  RemoveFromBasket,
  DeleteItem,
  ClearBasket, // Ensure this is correctly exported
} = ProductSlice.actions;
export default ProductSlice.reducer;
