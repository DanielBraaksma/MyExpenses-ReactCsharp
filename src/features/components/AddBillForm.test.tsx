import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../App/store";
import { AddBillForm } from "./AddBillForm";

describe("AddBillForm component", () => {
  const handleModal = jest.fn();
  it("should update form input values correctly on change", () => {
    const props = {
      isEditing: false,
      handleModal,
    };
    const { getByLabelText } = render(
      <Provider store={store}>
        <AddBillForm {...props} />
      </Provider>
    );
    const nameInput = getByLabelText("Name:");
    fireEvent.change(nameInput, { target: { value: "Electricity" } });
    expect(nameInput.value).toBe("Electricity");

    const amountInput = getByLabelText("Amount:");
    fireEvent.change(amountInput, { target: { value: 100 } });
    expect(amountInput.value).toBe("100");

    const dateInput = getByLabelText("Date:");

    fireEvent.change(dateInput, { target: { value: "2023-04-27" } });
    expect(dateInput.value).toBe("2023-04-27");

    const categoryInput = getByLabelText("Category:");
    fireEvent.change(categoryInput, { target: { value: "utility" } });
    expect(categoryInput.value).toBe("utility");
  });

  it("should edit a bill successfully", async () => {
    const editingBill = {
      id: "1",
      name: "Electricity Bill",
      amount: 200,
      date: "2023-05-01",
      category: "Utilities",
    };
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <AddBillForm
          isEditing={true}
          handleModal={handleModal}
          editingBill={editingBill}
        />
      </Provider>
    );

    fireEvent.change(getByLabelText("Name:"), {
      target: { value: "New Electricity Bill" },
    });

    fireEvent.change(getByLabelText("Amount:"), {
      target: { value: 300 },
    });

    fireEvent.change(getByLabelText("Date:"), {
      target: { value: "2023-06-01" },
    });

    fireEvent.change(getByLabelText("Category:"), {
      target: { value: "utility" },
    });

    fireEvent.submit(getByText("Submit"));

    await waitFor(() => {
      expect(handleModal).toHaveBeenCalledTimes(1);
    });
  });
});
