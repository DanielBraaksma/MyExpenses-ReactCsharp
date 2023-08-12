import { BillType, deleteBill } from "../slices/billSlice";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

type Props = {
  bill: BillType;
  handleEditBill: (bill: BillType) => void;
};

export const Bill = (props: Props) => {
  const dispatch = useDispatch();
  const billStyles = {
    bill: {
      backgroundColor: "blue",
      display: "grid",
      gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr",
      gridTemplateRows: "45px",
      alignItems: "center",
      color: "#fff",
      borderRadius: "3px",
      marginBottom: "1em",
    } as React.CSSProperties,
  };

  const handleDeleteBill = async (id: string) => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(
        `https://app-myexpenses-eastus-dev-001.azurewebsites.net/api/Bills/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      )
        .then((response) => {
          if (response.ok) {
            dispatch(deleteBill(id));
            console.log("Bill deleted successfully");
          } else {
            console.log(response);
            throw new Error("Failed to delete bill");
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const formattedDate = () => {
    const date = new Date(props.bill.date);
    return date.toLocaleDateString();
  };
  // console.log(typeof(props.bill.date))

  return (
    <div style={billStyles.bill}>
      <p>{props.bill.name}</p>
      <p>{formattedDate()}</p>
      <p>{props.bill.amount.toString()}</p>
      <Button
        style={{ position: "static" }}
        size="small"
        onClick={() => handleDeleteBill(props.bill.id!)}
      >
        Delete
      </Button>
      <Button
        style={{ position: "static" }}
        size="small"
        onClick={() => props.handleEditBill(props.bill)}
      >
        Edit
      </Button>
    </div>
  );
};

// children example
// export const Bill = ({ children }: { children: React.ReactElement }) => {
//     const billStyles = {
//         bill: {
//             backgroundColor: 'blue'
//         } as React.CSSProperties,
//     };

//     return (
//         <div style={billStyles.bill}>{children}</div>
//       );
// }
