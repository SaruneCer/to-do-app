import styles from "../../styles/Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rounded?: boolean;
  small?: boolean;
  large?: boolean;
  confirm?: boolean;  
  cancel?: boolean;   
}

const Button = ({ className = "", small, large, confirm, cancel, ...props }: ButtonProps) => {
  const buttonClassName = `
    ${styles.button}
    ${small ? styles.small : ""}
    ${large ? styles.large : ""}
    ${confirm ? styles.confirm : ""}
    ${cancel ? styles.cancel : ""}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <button className={buttonClassName} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
