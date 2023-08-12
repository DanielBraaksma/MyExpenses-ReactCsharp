import { categories } from "../../constants/constants";
import { nanoid } from "nanoid";

export interface BillType {
  id?: string;
  name: string;
  amount: number;
  date: Date;
  category: string;
}

export interface stateShape {
  bills: BillType[];
  user: { isAuth: boolean };
}

const initialState: BillType[] = [
  // {id: nanoid(), name: 'Water Bill', amount: 100, date: new Date('2023-01-01'), category: "utility"},
  // {id: nanoid(), name: 'Movie Tickets', amount: 22.50, date: new Date('2023-01-23'), category: "entertainment"},
  // {id: nanoid(), name: 'Gas', amount: 33, date: new Date('2023-01-07'), category: "transportation"},
];

// reducer
export const billsReducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case "bills/getBills":
      const typeSafeBills = action.payload.map((bill: any) => {
        return { ...bill, amount: parseFloat(bill.amount) };
      });
      return typeSafeBills;
    case "bills/addBill":
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          amount: action.payload.amount,
          date: action.payload.date,
          category: action.payload.category,
        },
      ];
    case "bills/deleteBill":
      return state.filter((bill) => bill.id !== action.payload);
    case "bills/editBill":
      return state.map((bill) => {
        return bill.id === action.payload.id
          ? {
              id: action.payload.id,
              name: action.payload.name,
              amount: action.payload.amount,
              date: action.payload.date,
              category: action.payload.category,
            }
          : { ...bill };
      });
    case "bills/clearStore":
      return [];
    default:
      return state;
  }
};

// action creators

export const getBills = (bills: any) => {
  return {
    type: "bills/getBills",
    payload: bills,
  };
};

export const addBill = (bill: BillType) => {
  return {
    type: "bills/addBill",
    payload: bill,
  };
};

export const deleteBill = (id: string) => {
  return {
    type: "bills/deleteBill",
    payload: id,
  };
};

export const editBill = (bill: BillType) => {
  return {
    type: "bills/editBill",
    payload: bill,
  };
};

export const clearStore = () => {
  return { type: "bills/clearStore" };
};

// selectors

export const selectBills = (state: stateShape) => {
  return state.bills;
};
