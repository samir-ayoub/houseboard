import React from "react";
import Weather from "./components/Weather/Weather";
import Calendar from "./components/Calendar/Calendar";
import Grid from "@mui/material/Grid2";
import Timer from "./components/Timer/Timer";
import { Box, Toolbar, Typography } from "@mui/material";

// import SalesList from './SalesList';
// import AddSaleForm from './AddSaleForm';

const getDate = () => {
  const date = new Date();
  return date.toDateString();
};

const App: React.FC = () => {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Timer />
          </Box>
          <Typography variant="h6" component="div">
            {getDate()}
          </Typography>
        </Toolbar>
      </Box>

      <Grid container spacing={4}>
        <Grid size={4}>
          <Weather />
        </Grid>
        <Grid size={4}>
          <Calendar />
        </Grid>
      </Grid>
      {/* <SalesList sales={sales} /> */}
      {/* <AddSaleForm addSale={addSale} /> */}
    </div>
  );
};

export default App;
