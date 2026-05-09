import { MenuItem, InputLabel, FormControl, Select } from "@mui/material";

const ReusableSelect = ({ label, value, onChange, items }) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select
      value={value}
      label={label}
      onChange={onChange}
    >
      {items.map((item, index) => (
        <MenuItem value={item} key={index}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default function ServiceSelection({
  deviceType,
  setDeviceType,
  brand,
  setBrand,
  problemType,
  setProblemType,
  deviceTypes,
  brands,
  problems,
}) {
  return (
    <>
      {/* device Type */}
      <ReusableSelect
        label="نوع دستگاه"
        value={deviceType}
        onChange={(e) => setDeviceType(e.target.value)}
        items={deviceTypes}
      />

      {/* brand */}
      <ReusableSelect
        label="برند"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        items={brands}
      />

      {/* problem Type */}
      <ReusableSelect
        label="نوع مشکل"
        value={problemType}
        onChange={(e) => setProblemType(e.target.value)}
        items={problems}
      />
    </>
  );
}
