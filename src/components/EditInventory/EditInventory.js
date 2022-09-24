import React, { Component } from "react";
import axios from "axios";
import "./EditInventory.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import errorIcon from "../../assets/icons/error-24px.svg";
import { Link } from "react-router-dom";

const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_SERVER_URL_BACKUP;

class EditInventory extends Component {
  componentDidMount() {
    axios
      .get(`${SERVER_URL}/inventories/${this.props.match.params.id}`)
      .then((res) => {
        const item = res.data[0];
        this.setState({
          warehouseID: item.warehouseID,
          warehouseName: item.warehouseName,
          item: item.itemName,
          description: item.description,
          quantity: item.quantity,
          category: item.category,
          status: item.status,
          touched: {
            warehouseName: false,
            item: false,
            description: false,
            quantity: false,
            status: false,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChangeItem = (e) => {
    this.setState({ item: e.target.value });
  };

  handleChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  handleChangeWarehouse = (e) => {
    const warehouseNames = this.props.warehouseData.map((warehouse) => {
      return { id: warehouse.id, name: warehouse.name };
    });
    warehouseNames.forEach((warehouse) => {
      if (warehouse.name === e.target.value) {
        this.setState({
          warehouseID: warehouse.id,
          warehouseName: warehouse.name,
        });
      }
    });
  };

  handleChangeCategory = (e) => {
    this.setState({ category: e.target.value });
  };

  handleChangeStatus = (e) => {
    if (e.target.value === "Out of Stock") {
      this.setState({
        status: e.target.value,
        quantity: 0,
      });
    } else {
      this.setState({ status: e.target.value });
    }
  };

  handleChangeQuantity = (e) => {
    this.setState({ quantity: e.target.value });
  };

  // Retrieve list of unique categories from full list of inventory data
  // then sort alphabetically
  getCategories = () => {
    const { inventoryData } = this.props;
    const allCategories = Array.from(inventoryData).map((item) => {
      return item.category;
    });
    const uniqueCategories = [...new Set(allCategories)];
    const categoryList = uniqueCategories.sort();
    return categoryList;
  };

  // Retrieve list of unique warehouse names from full list of warehouse data
  // then sort alphabetically
  getWarehouseList = () => {
    const { warehouseData } = this.props;
    const allWarehouseNames = Array.from(warehouseData).map((warehouse) => {
      return warehouse.name;
    });
    const uniqueWarehouseNames = [...new Set(allWarehouseNames)];
    const warehouseList = uniqueWarehouseNames.sort();
    return warehouseList;
  };

  // Mark inputs as 'touched' after user has accessed them
  // Form error notifications only activated for 'touched' items
  handleBlur = (e) => {
    let touchedInput = e.target.name;
    let touchedStates = { ...this.state.touched };
    touchedStates[touchedInput] = true;
    this.setState({ touched: touchedStates });
  };

  isQuantityValid = () => {
    // if item is marked as in stock, but quantity is set to 0 or is not a number, quantity is not valid
    if (
      this.state.status === "In Stock" &&
      (parseInt(this.state.quantity) === 0 ||
        isNaN(parseInt(this.state.quantity)))
    ) {
      return false;
    }
    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.item === "" ||
      this.state.description === "" ||
      this.state.quantity === ""
    ) {
      alert("Please fill in all the required fields !!!");
    } else if (!this.isQuantityValid()) {
      alert("Quantity should be greater than 0");
    } else {
      axios
        .put(`${SERVER_URL}/inventories/${this.props.match.params.id}`, {
          warehouseID: this.state.warehouseID,
          warehouseName: this.state.warehouseName,
          itemName: this.state.item,
          description: this.state.description,
          category: this.state.category,
          status: this.state.status,
          quantity: this.state.quantity,
        })
        .then((res) => {
          this.props.history.push("/inventory");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.goBack();
  };

  render() {
    if (!this.state) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="main-container">
        <div className="main-heading">
          <Link to="/inventory" className="main-heading__nav-link">
            <img
              className="main-heading__nav-icon"
              src={backArrow}
              alt="Go back"
              role="link"
              tabIndex="0"
            />
          </Link>
          <h1>Edit Inventory Item</h1>
        </div>

        <form
          className="inventory-form"
          type="submit"
          onSubmit={this.handleSubmit}>
          <fieldset className="inventory-form__section inventory-form__section--details">
            <h2 className="inventory-form__heading">Item Details</h2>
            <label className="inventory-form__label" htmlFor="itemName">
              Item Name
              <input
                required
                className={
                  this.state.item || !this.state.touched.item
                    ? "inventory-form__input"
                    : " inventory-form__input inventory-form__input--invalid"
                }
                name="itemName"
                value={this.state.item}
                placeholder="Item Name"
                onChange={this.handleChangeItem}
                onBlur={this.handleBlur}
              />
              {!this.state.itemName ||
                (!this.state.touched.itemName && (
                  <span className="inventory-form__error">
                    <img
                      className="inventory-form__error-icon"
                      src={errorIcon}
                      alt="error"
                    />
                    <p className="inventory-form__error-message">
                      This field is required
                    </p>
                  </span>
                ))}
            </label>

            <label className="inventory-form__label" htmlFor="description">
              Description
              <textarea
                className={
                  this.state.description || !this.state.touched.description
                    ? "inventory-form__input inventory-form__input--textarea"
                    : " inventory-form__input inventory-form__input--textarea inventory-form__input--invalid"
                }
                name="description"
                value={this.state.description}
                placeholder="Please enter a brief item description..."
                onChange={this.handleChangeDescription}
                onBlur={this.handleBlur}
              />
              {!this.state.description && this.state.touched.description && (
                <span className="inventory-form__error">
                  <img
                    className="inventory-form__error-icon"
                    src={errorIcon}
                    alt="error"
                  />
                  <p className="inventory-form__error-message">
                    This field is required
                  </p>
                </span>
              )}
            </label>

            <label className="inventory-form__label" htmlFor="category">
              Category
              <select
                className={
                  this.state.category || !this.state.touched.category
                    ? "inventory-form__input inventory-form__input--select"
                    : " inventory-form__input inventory-form__input--select inventory-form__input--invalid"
                }
                name="category"
                onChange={this.handleChangeCategory}
                onBlur={this.handleBlur}
                value={this.state.category}>
                <option disabled value="">
                  Please select
                </option>
                {this.getCategories().map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {!this.state.category && this.state.touched.category && (
                <span className="inventory-form__error">
                  <img
                    className="inventory-form__error-icon"
                    src={errorIcon}
                    alt="error"
                  />
                  <p className="inventory-form__error-message">
                    This field is required
                  </p>
                </span>
              )}
            </label>
          </fieldset>

          <fieldset className="inventory-form__section inventory-form__section--contact">
            <h2 className="inventory-form__heading">Item Availability</h2>
            <label className="inventory-form__label" htmlFor="status">
              Status
              <div className="inventory-form__radio">
                <label className="inventory-form__radio-label">
                  <input
                    type="radio"
                    id="in-stock"
                    className="inventory-form__radio-button"
                    name="status"
                    checked={this.state.status === "In Stock"}
                    value="In Stock"
                    onChange={this.handleChangeStatus}
                  />
                  In Stock
                </label>
                <label className="inventory-form__radio-label">
                  <input
                    type="radio"
                    id="in-stock"
                    className="inventory-form__radio-button"
                    name="status"
                    checked={this.state.status === "Out of Stock"}
                    value="Out of Stock"
                    onChange={this.handleChangeStatus}
                  />
                  Out of Stock
                </label>
              </div>
            </label>
            {!(this.state.status === "Out of Stock") && (
              <label
                className="inventory-form__label"
                htmlFor=""
                hidden={this.state.status === "Out of Stock"}>
                Quantity
                <input
                  className={
                    this.state.quantity || !this.state.touched.quantity
                      ? "inventory-form__input"
                      : " inventory-form__input inventory-form__input--invalid"
                  }
                  name="quantity"
                  value={this.state.quantity}
                  placeholder="0"
                  disabled={"" === "Out of Stock"}
                  onChange={this.handleChangeQuantity}
                  onBlur={this.handleBlur}
                />
                {/* After quantity has been modified, error message is displayed if the provided value is not a number */}
                {isNaN(parseInt(this.state.quantity)) &&
                  this.state.touched.quantity && (
                    <span className="inventory-form__error">
                      <img
                        className="inventory-form__error-icon"
                        src={errorIcon}
                        alt="error"
                      />
                      <p className="inventory-form__error-message">
                        Quantity must be provided as a number.
                      </p>
                    </span>
                  )}
                {/* After quantity has been modified, returns an error message if the item is marked as in stock but the quantity is set to 0*/}
                {"" === "In Stock" &&
                  parseInt(this.state.quantity) === 0 &&
                  this.state.touched.quantity && (
                    <span className="inventory-form__error">
                      <img
                        className="inventory-form__error-icon"
                        src={errorIcon}
                        alt="error"
                      />
                      <p className="inventory-form__error-message">
                        Please indicate quantity of items in stock or mark as
                        out of stock.
                      </p>
                    </span>
                  )}
              </label>
            )}

            <label className="inventory-form__label" htmlFor="warehouseName">
              Warehouse
              <select
                className={
                  this.state.warehouseName || !this.state.touched.warehouseName
                    ? "inventory-form__input inventory-form__input--select"
                    : " inventory-form__input inventory-form__input--select inventory-form__input--invalid"
                }
                name="warehouseName"
                onBlur={this.handleBlur}
                value={this.state.warehouseName}
                onChange={this.handleChangeWarehouse}>
                <option disabled value="">
                  Please select
                </option>
                {this.getWarehouseList().map((warehouse, index) => (
                  <option key={index} value={warehouse}>
                    {warehouse}
                  </option>
                ))}
              </select>
              {!this.state.warehouseName && this.state.touched.warehouseName && (
                <span className="inventory-form__error">
                  <img
                    className="inventory-form__error-icon"
                    src={errorIcon}
                    alt="error"
                  />
                  <p className="inventory-form__error-message">
                    This field is required
                  </p>
                </span>
              )}
            </label>
          </fieldset>

          <div className="inventory-form__button-wrapper">
            {/* CTA button first in HTML for keyboarding order, reversed visually with flex:row-reverse */}
            <button className="inventory-form__button inventory-form__button--CTA">
              Save
            </button>
              <button className=" inventory-form__button inventory-form__button--cancel" onClick={this.handleCancel}>
                Cancel
              </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditInventory;
