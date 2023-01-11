import { ButtonSpinner } from "./button.styles";

const BaseButton = ({children, buttonType, isLoading, ...otherProps}) => {
  return (
    <button disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </button>
  )
}

export default BaseButton;