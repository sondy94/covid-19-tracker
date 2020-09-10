import React, { useState } from "react";
import { Select, MenuItem, FormControl } from "@material-ui/core";
import "./header.css";

function Header({ countries }) {
  const [country, setCountry] = useState("worlwide");

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app_header">
      <h1>COVID 19 TRACKER</h1>
      <FormControl>
        <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country) => (
            <MenuItem value={country.name}>{country.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;
