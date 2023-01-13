import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ButtonSpinner } from './button.styles';

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading: boolean;
  children: ReactNode;
};
const BaseButton = ({ children, isLoading, ...otherProps }: BaseButtonProps) => {
  return (
    <button {...otherProps} disabled={isLoading}>
      {isLoading ? <ButtonSpinner /> : children}
    </button>
  );
};

export default BaseButton;
