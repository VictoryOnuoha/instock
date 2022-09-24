import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import axios from "axios";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import WarehouseList from "./components/WarehouseList/WarehouseList";
import WarehouseDetails from "./components/WarehouseDetails/WarehouseDetails";
import ItemDetails from "./components/ItemDetails/ItemDetails";
import AddNewWarehouse from "./components/AddNewWarehouse/AddNewWarehouse";
import AddNewInventory from "./components/AddNewInventory/AddNewInventory";
import EditWarehouse from "./components/EditWarehouse/EditWarehouse";
import EditInventory from "./components/EditInventory/EditInventory";
import InventoryList from "./components/InventoryList/InventoryList";

import "./App.scss";

const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_SERVER_URL_BACKUP;

class App extends React.Component {
  state = {
    warehouseData: [],
    inventoryData: [],
  };

  componentDidMount() {
    axios
      .get(`${SERVER_URL}/warehouses`)
      .then((res) => {
        this.setState({
          warehouseData: res.data,
        });
      })
      .catch((err) => {
        console.log("Couldn't fetch warehouses: ", err);
      });

    axios
      .get(`${SERVER_URL}/inventories`)
      .then((res) => {
        this.setState({
          inventoryData: res.data,
        });
      })
      .catch((err) => {
        console.log("Couldn't fetch inventories: ", err);
      });
  }
  render() {
    if (!this.state.warehouseData.length) {
      return <h1>Loading...</h1>;
    }
    return (
      <>
        <div className="page__wrapper">
          <Router>
            <Header />
            <Switch>
              <Route exact path="/">
                <Redirect to="/warehouse" />
              </Route>
              <Route
                path="/warehouse"
                exact
                render={(routeProps) => {
                  return (
                    <WarehouseList
                      {...routeProps}
                      warehouseData={this.state.warehouseData}
                    />
                  );
                }}
              />
              <Route
                path="/warehouse/add"
                render={(routeProps) => {
                  return <AddNewWarehouse {...routeProps} />;
                }}
              />
              <Route
                exact
                path="/warehouse/:id"
                render={(routeProps) => {
                  return (
                    <WarehouseDetails
                      {...routeProps}
                      inventoryData={this.state.inventoryData}
                      warehouseData={this.state.warehouseData}
                    />
                  );
                }}
              />

              <Route
                path="/warehouse/:id/edit"
                render={(routeProps) => {
                  return (
                    <EditWarehouse
                      {...routeProps}
                      warehouseData={this.state.warehouseData}
                    />
                  );
                }}
              />

              <Route
                path="/inventory"
                exact
                render={(routeProps) => {
                  return (
                    <InventoryList
                      {...routeProps}
                      inventoryData={this.state.inventoryData}
                    />
                  );
                }}
              />

              <Route
                exact
                path="/inventory/add"
                render={(routeProps) => {
                  return (
                    <AddNewInventory
                      {...routeProps}
                      inventoryData={this.state.inventoryData}
                      warehouseData={this.state.warehouseData}
                    />
                  );
                }}
              />

              <Route
                path="/inventory/:id/edit"
                render={(routeProps) => {
                  return (
                    <EditInventory
                      {...routeProps}
                      inventoryData={this.state.inventoryData}
                      warehouseData={this.state.warehouseData}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/inventory/:id"
                render={(routeProps) => {
                  return (
                    <ItemDetails
                      {...routeProps}
                      inventoryData={this.state.inventoryData}
                      warehouseData={this.state.warehouseData}
                    />
                  );
                }}
              />
            </Switch>
          </Router>
        
          <Footer />
        </div>
      </>
    );
  }
}

export default App;
