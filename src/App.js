import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import { Paper } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { fetchCountries } from "./api";
import AreaChart from "./components/AreaChart";
import covidLogo from "./images/covid19.svg";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("turkey");
  useEffect(() => {
    const fetchCountriesData = async () => {
      const countries = await fetchCountries();
      setCountries(countries);
    };

    fetchCountriesData();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid Container>
          <img
            src={covidLogo}
            alt="Covid19 Logo"
            style={{
              marginTop: 20,
              marginRight: 20,
              width: 200,
              height: 100,
            }}
          />

          <FormControl
            variant="standard"
            sx={{ margin: "50px auto", width: "80%" }}
          >
            <Select
              value={country}
              label="Age"
              onChange={(event) => setCountry(event.target.value)}
              style={{
                marginRight: 0,
              }}
            >
              {countries.map((country) => (
                <MenuItem value={country.Slug}>{country.Country}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Grid item xs={12}>
            <Paper>
              <AreaChart country={country} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default App;
