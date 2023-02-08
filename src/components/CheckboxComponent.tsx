interface CheckboxProp {
  sizes: any;
  filterSize: string[];
  setFilterSize: Function;
}

const CheckboxComponent = ({
  sizes,
  filterSize,
  setFilterSize,
}: CheckboxProp) => {
  const handleSizeFilter = (value: any) => {};

  return (
    <div className="flex flex-col items-end">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fill-rule="evenodd"
          d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
          clip-rule="evenodd"
        />
      </svg>
      <ul
        onClick={(e) => e.stopPropagation()}
        className="absolute | flex flex-col items-start | bg-slate-200 | translate-y-8 | px-5 py-2 w-32 | rounded-md shadow-xl"
      >
        {sizes.map((s: any) => (
          <div className="flex items-baseline | gap-5">
            <input
              type="checkbox"
              onClick={() => handleSizeFilter(s.value)}
              value={s.value}
            />
            <label>{s.label}</label>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default CheckboxComponent;
