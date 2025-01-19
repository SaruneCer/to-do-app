import styles from "../../styles/ConfirmationModal.module.scss";
import Button from "./Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h4>{message}</h4>
        <div className={styles.buttons}>
          <Button onClick={onConfirm} small confirm>
            Confirm
          </Button>
          <Button onClick={onCancel} small cancel>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
