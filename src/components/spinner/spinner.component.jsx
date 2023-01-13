import { SpinnerContainer, SpinnerOverlay } from './spinner.styles';

const Spinner = ({ children }) => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
      {children}
    </SpinnerOverlay>
  );
};

export default Spinner;
