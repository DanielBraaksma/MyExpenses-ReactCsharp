import React from "react";
import { useEffect, useState } from "react";
import "../../scss/Form.scss";
import { categories } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { addBill, editBill } from "../slices/billSlice";
import { selectBills } from "../slices/billSlice";
import { BillType } from "../slices/billSlice";
import { nanoid } from "nanoid";
import { Button } from "@mui/material";

interface FormProps {
  handleModal: () => void;
  editingBill?: BillType;
  isEditing: boolean;
}

interface FormValues {
  name: string;
  amount: string | number;
  date: string | Date;
  category: string;
}

export const AddBillForm: React.FC<FormProps> = ({
  isEditing,
  handleModal,
  editingBill,
}) => {
  const bills = useSelector(selectBills);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState<FormValues>({
    name: editingBill?.name || "",
    amount: editingBill?.amount || "",
    date: editingBill?.date.toLocaleString() || "",
    category: editingBill?.category || "",
  });

  useEffect(() => {
    setFormValues({
      name: editingBill?.name || "",
      amount: editingBill?.amount || "",
      date: editingBill?.date || "",
      category: editingBill?.category || "",
    });
  }, [editingBill]);

  useEffect(() => {});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = Object.values(formValues);
    let isFormValid = true;
    values.forEach((value) => {
      if (!value) {
        alert("please enter valid value for each entry");
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      return;
    }
    console.log("hit here");

    const bill = {
      name: formValues.name,
      amount: parseInt(formValues.amount.toString()),
      date: new Date(formValues.date),
      category: formValues.category,
    };
    // debugger;
    isEditing
      ? putBillToDB({ ...bill, id: editingBill!.id })
      : postBillToDB(bill);
    // isEditing
    //   ? dispatch(editBill({ ...bill, id: editingBill!.id }))
    //   : dispatch(addBill(bill));

    // should dispatch an event that tells the useEffect in Main.tsx to reload

    clearForm();
    // setIsMounted(false);
    handleModal();
  };

  const putBillToDB = async (bill: BillType) => {
    console.log("put bill to db");
    const token = localStorage.getItem("token");
    if (token) {
      fetch(
        `https://app-myexpenses-eastus-dev-001.azurewebsites.net/api/Bills/${bill.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: bill.name,
            amount: bill.amount,
            date: bill.date,
            category: bill.category,
          }),
          credentials: "include",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error editing bill");
          }
          console.log("Bill edited successfully");
          dispatch(editBill(bill));
        })
        .catch((error) => console.error(error));
    }
  };

  const postBillToDB = async (bill: BillType) => {
    console.log(bill);

    // const billtest = {
    //           name: 'test',
    //           amount: 400,
    //           date: new Date('2023-02-13'),
    //           category: "transportation"
    //         };

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch(
          "https://app-myexpenses-eastus-dev-001.azurewebsites.net/api/Bills",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bill),
            credentials: "include",
          }
        );

        const responseData = await response.json();
        console.log(responseData);
        console.log("finished call to create bill");
        alert(responseData.name);
        dispatch(addBill(bill));
      } catch (error) {
        console.error(error);
        alert("Failed to create bill");
      }
    }
  };
  const clearForm = () => {
    setFormValues({
      name: "",
      amount: "",
      date: "",
      category: "",
    });
  };

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    // console.log(`name-${name}`, `value-${value}`)
    console.log(`form on input change${formValues}`);
    setFormValues({ ...formValues, [name]: value });
    // debugger;
  };

  const dateFormatter = (date: string) => {
    const dateParts = date.split("/");
    const year = dateParts[2];
    const month = dateParts[0].padStart(2, "0");
    const day = dateParts[1].padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate; // Output: "2023/01/06"
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          id="name"
          className="form-input"
          name="name"
          type="text"
          value={formValues.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount" className="form-label">
          Amount:
        </label>
        <input
          id="amount"
          className="form-input"
          name="amount"
          type="text"
          value={formValues.amount}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date" className="form-label">
          Date:
        </label>
        <input
          id="date"
          className="form-input"
          name="date"
          type="date"
          value={formValues.date.toString()}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="category" className="form-label">
          Category:
        </label>
        <select
          id="category"
          className="form-input"
          name="category"
          value={formValues.category}
          onChange={handleInputChange}
        >
          <option value="">Select a category</option>
          <option value={categories.ENTERTAINMENT}>
            {categories.ENTERTAINMENT}
          </option>
          <option value={categories.TRANSPORTATION}>
            {categories.TRANSPORTATION}
          </option>
          <option value={categories.UTILITY}>{categories.UTILITY}</option>
          <option value={categories.OTHER}>{categories.OTHER}</option>
        </select>
      </div>
      <Button
        type="submit"
        variant="outlined"
        size="small"
        style={{ margin: "10px" }}
      >
        Submit
      </Button>
    </form>
  );
};
