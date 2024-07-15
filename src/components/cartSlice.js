import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      images:
        "https://im.indiatimes.in/content/2020/Mar/iPhone-9-and-9-plus_5e71d66e079f2.jpg?w=1200&h=900&cc=1",
      quantity: 1,
    },
    {
      id: 2,
      title: "iPhone X",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip",
      price: 899,
      discountPercentage: 17.94,
      rating: 4.44, //---------
      stock: 34,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
      images: "https://m.media-amazon.com/images/I/61HHbO9NDFL.jpg",
    },
    {
      id: 3,
      title: "Samsung Universe 9",
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      discountPercentage: 15.46,
      rating: 4.09,
      stock: 36,
      brand: "Samsung",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
      images:
        "https://admin.hyperce.io/assets/thumbnail__12__preview.jpg?w=800",
    },
    {
      id: 4,
      title: "OPPOF19",
      description: "OPPO F19 is officially announced on April 2021.",
      price: 280,
      discountPercentage: 17.91,
      rating: 4.3,
      stock: 123,
      brand: "OPPO",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
      images:
        "https://5.imimg.com/data5/SELLER/Default/2023/6/316894377/HW/EM/ZV/157629195/oppo-f19-pro-plus-5g-8-128gb-.jpg",
    },
    {
      id: 5,
      title: "Huawei P30",
      description:
        "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
      price: 499,
      discountPercentage: 10.58,
      rating: 4.09,
      stock: 32,
      brand: "Huawei",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
      images:
        "https://5.imimg.com/data5/ZR/TV/HW/SELLER-57126529/huawei-p30-pro-6-gb-ram-plus-128-gb-rom-pearl-white-mobile-500x500.jpg",
    },
  ],
  overallTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      state.overallTotal = calculateOverallTotal(state.products);
    },
    removeFromCart(state, action) {
      const { id } = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
      state.overallTotal = calculateOverallTotal(state.products);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product) {
        product.quantity = quantity;
      }
      state.overallTotal = calculateOverallTotal(state.products);
    },
  },
});

const calculateOverallTotal = (products) => {
  let total = 0;
  products.forEach((product) => {
    const priceAfterDiscount =
      product.price - product.price * (product.discountPercentage / 100);
    total += priceAfterDiscount * (product.quantity || 1);
  });
  return total.toFixed(2);
};

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
