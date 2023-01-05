const BaseButton = ({children, buttonType, ...otherProps}) => {
  return (
    <button {...otherProps}>
      {children}
    </button>
  )
}

export default BaseButton;