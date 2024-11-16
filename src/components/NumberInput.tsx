function NumberInput(
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { min, max, step } = props;
    if (min) {
      e.target.value = String(Math.max(Number(e.target.value), Number(min)));
    }
    if (max) {
      e.target.value = String(Math.min(Number(e.target.value), Number(max)));
    }
    if (step) {
      const stepNum = Number(step);
      e.target.value = String(Math.round(Number(e.target.value) / stepNum) * stepNum);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <input
      {...props}
      type="number"
      onChange={handleChange}
    />
  );
}

export default NumberInput;
