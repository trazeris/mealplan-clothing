import { ReactNode } from 'react';
import { SpinnerContainer, SpinnerOverlay } from './spinner.styles';

type Spinner = {
  children?: ReactNode;
};

const Spinner = ({ children }: Spinner) => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
      {children}
    </SpinnerOverlay>
  );
};

export default Spinner;
