interface SelectProp {
  options: Option[];
  setOption: Function;
  className: string;
}

const SelectComponent = ({ options, setOption, className }: SelectProp) => {
  return (
    <select className={className} onChange={(e) => setOption(e.target.value)}>
      {options.map((o) => (
        <option>{o.label}</option>
      ))}
    </select>
  );
};

export default SelectComponent;

export class Option {
  value: string;
  label: string;

  constructor(value: string, label: string) {
    this.value = value;
    this.label = label;
  }
}
