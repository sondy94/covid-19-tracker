import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import { Card, CardContent } from "@material-ui/core";
import Table from "./components/Table";
import { sortData } from "./utilities";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const onCountryChange = (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  return (
    <div className="App">
      <div className="app_left">
        <Header
          countries={countries}
          country={country}
          onCountryChange={onCountryChange}
        />

        <div className="app_stats">
          <InfoBox
            title="Corona Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />

          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />

          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <Map />
      </div>

      <div className="app_right">
        <Card>
          <CardContent>
            <h2>Live cases by country</h2>
            <Table countries={tableData} />
            <h2>Worldwide new cases</h2>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
