import { FormInputLabel, Group, NiceInput } from './form-input.styles';

const FormInput = ({label, ...otherInputProps}) => {
  return (
    <Group>
      <NiceInput {...otherInputProps} />
      {label && <FormInputLabel shrinked={otherInputProps.value}>{label}</FormInputLabel>}
    </Group>
  )
}

export default FormInput;

