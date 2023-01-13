import { FormInputLabel, Group, NiceInput } from './form-input.styles';

type FormInputProps = HTMLInputElement & { label: string };

const FormInput = ({ label, ...otherInputProps }: FormInputProps) => {
  return (
    <Group>
      <NiceInput {...otherInputProps} />
      {label && <FormInputLabel shrinked={otherInputProps.value}>{label}</FormInputLabel>}
    </Group>
  );
};

export default FormInput;
