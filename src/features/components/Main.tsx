import "../../App.scss";
import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Bill } from "./Bill";
import { Modal } from "./Modal";
import { AddBillForm } from "./AddBillForm";
import { PieChart } from "./PieChart";
import { BillType, getBills } from "../slices/billSlice";
import { selectBills } from "../slices/billSlice";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const Main = () => {
  const dispatch = useDispatch();
  const bills = useSelector(selectBills);
  const [isLoading, setIsLoading] = useState(true);
  const sortedBills = bills.sort(
    (a: BillType, b: BillType) => a.date.valueOf() - b.date.valueOf()
  );

  console.log("render main conponent");

  const [showModal, setShowModal] = useState(false);
  const [editBill, setEditBill] = useState<BillType | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(
        "https://app-myexpenses-eastus-dev-001.azurewebsites.net/api/Bills",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setIsLoading(false);
          dispatch(getBills(data));
        });
      console.log("in useEffect, after a dispatch to getBills");
    }
  }, [showModal]);

  const handleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleEditBill = (bill: BillType) => {
    setEditBill(bill);
    handleModal();
  };

  const content = sortedBills.map((bill) => (
    <Bill bill={bill} handleEditBill={handleEditBill}></Bill>
  ));

  console.log(bills);

  return (
    <div className="App">
      <Header></Header>
      <main>
        <div className="container">
          <div className="container-header">
            <h2>My Bills</h2>
            <Button
              size="small"
              variant="contained"
              className="container-header-addBill"
              onClick={() => {
                handleModal();
                setEditBill(null);
              }}
            >
              Add Bill
            </Button>
            <Modal handleModal={handleModal} show={showModal}>
              {editBill && (
                <AddBillForm
                  isEditing={true}
                  handleModal={handleModal}
                  editingBill={editBill}
                ></AddBillForm>
              )}
              {!editBill && (
                <AddBillForm
                  isEditing={false}
                  handleModal={handleModal}
                ></AddBillForm>
              )}
            </Modal>
          </div>
          <div className="container-content">
            {isLoading ? (
              <CircularProgress size={80} />
            ) : (
              <>
                {content.length ? (
                  content
                ) : (
                  <p>Add some Bills to get started!</p>
                )}
              </>
            )}
          </div>
        </div>
        <div className="container">
          <h2>Expense Categories</h2>
          <div className="container-content chart">
            <PieChart></PieChart>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Main;
