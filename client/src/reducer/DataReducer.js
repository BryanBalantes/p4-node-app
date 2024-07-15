export const initialState = {
  itemType: "",
  size: "",
  qty: 0,
  price: 0,
  totalPrice: 0,
};

export const DataReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_ITEM":
      return { ...state, itemType: action.payload };
    case "UPDATE_QTY":
      return { ...state, qty: action.payload };
    case "UPDATE_SIZE":
      return { ...state, size: action.payload };
    case "UPDATE_PRICE":
      return { ...state, price: action.payload.price };
    case "UPDATE_TOTAL":
      return { ...state, totalPrice: action.payload.totalPrice };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};
