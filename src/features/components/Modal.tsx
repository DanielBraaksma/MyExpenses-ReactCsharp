import { Button } from "@mui/material";
import "../../scss/Modal.scss";

interface Props {
  handleModal: () => void;
  show: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<Props> = ({ handleModal, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <Button
          onClick={handleModal}
          variant="outlined"
          size="small"
          style={{ margin: "5px" }}
        >
          Close
        </Button>
      </section>
    </div>
  );
};
