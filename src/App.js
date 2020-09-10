import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import { Card, CardContent } from "@material-ui/core";

export default function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));

          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  return (
    <div className="App">
      <div className="app_left">
        <Header countries={countries} />

        <div className="app_stats">
          <InfoBox title="Corona Cases" cases={123} total={2000} />
          <InfoBox title="Recovered" cases={123} total={2000} />
          <InfoBox title="Deaths" cases={12377} total={2000} />
        </div>
        <Map />
      </div>

      <div className="app_right">
        <Card>
          <CardContent>
            <h2>Live cases by country</h2>
            <h2>Worldwide new cases</h2>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
