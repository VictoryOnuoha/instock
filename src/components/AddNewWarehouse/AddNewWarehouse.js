import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AddNewWarehouse.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import errorIcon from "../../assets/icons/error-24px.svg";

const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_SERVER_URL_BACKUP;

class AddNewWarehouse extends Component {
  state = {
    warehouseName: "",
    address: "",
    city: "",
    country: "",
    name: "",
    position: "",
    phone: "",
    email: "",
    touched: {
      warehouseName: false,
      address: false,
      city: false,
      country: false,
      name: false,
      position: false,
      phone: false,
      email: false,
    },
  };

  handleUserInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Mark inputs as 'touched' after user has accessed them
  // Form error notifications only activated for 'touched' items
  handleBlur = (e) => {
    let touchedInput = e.target.name;
    let touchedStates = { ...this.state.touched };
    touchedStates[touchedInput] = true;
    this.setState({ touched: touchedStates });
  };

  isPhoneValid = () => {
    const phonePattern = new RegExp("^[0-9]{3}[-][0-9]{3}[-][0-9]{4}$");
    const phoneNum = this.state.phone;

    if (phonePattern.test(phoneNum)) {
      return true;
    }
    return false;
  };

  isEmailValid = () => {
    if (this.state.email.includes("@")) {
      return true;
    }
    return false;
  };

  isFormValid = () => {
    if (
      !this.state.warehouseName ||
      !this.state.address ||
      !this.state.city ||
      !this.state.country ||
      !this.state.name ||
      !this.state.position ||
      !this.state.phone ||
      !this.state.email
    ) {
      return false;
    }

    if (!this.isPhoneValid()) {
      return false;
    }

    if (!this.isEmailValid()) {
      return false;
    }

    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const warehouseDetails = {
      warehouseName: this.state.warehouseName,
      address: this.state.address,
      city: this.state.city,
      country: this.state.country,
      name: this.state.name,
      position: this.state.position,
      phone: this.state.phone,
      email: this.state.email,
    };
    axios
      .post(`${SERVER_URL}/warehouses/add`, warehouseDetails)
      .then(() => {
        console.log(warehouseDetails);
        e.target.reset();
        alert("New warehouse added!");
        
        this.props.history.push("/warehouse");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="main-container">
        <div className="main-heading">
          <Link className='main-heading__nav-link' to={"/"}>
            <img className='main-heading__nav-icon' src={backArrow} alt='go back'/>
          </Link>
          <h1>Add New Warehouse</h1>
        </div>

        <form
          className="warehouse-form"
          type="submit"
          onSubmit={this.handleSubmit}>
          <fieldset className="warehouse-form__section warehouse-form__section--details">
            <h2 className="warehouse-form__heading">Warehouse Details</h2>
            <label className="warehouse-form__label" htmlFor="warehouseName">
              Warehouse Name
              <input
                required
                className={
                  this.state.warehouseName || !this.state.touched.warehouseName
                    ? "warehouse-form__input"
                    : " warehouse-form__input warehouse-form__input--invalid"
                }
                name="warehouseName"
                placeholder="Warehouse Name"
                value={this.state.warehouseName}
                onChange={this.handleUserInput}
                onBlur={this.handleBlur}
              />
              {!this.state.warehouseName && this.state.touched.warehouseName && (
                <span className="warehouse-form__error">
                  <img className="warehouse-form__error-icon" src={errorIcon} alt='error'/>
                  <p className="warehouse-form__error-message">
                    This field is required
                  </p>
                </span>
              )}
            </label>

            <label className="warehouse-form__label" htmlFor="address">
              Street Address
              <input
                className={
                  this.state.address || !this.state.touched.address
                    ? "warehouse-form__input"
                    : " warehouse-form__input warehouse-form__input--invalid"
                }
                name="address"
                value={this.state.address}
                placeholder="Street Address"
                onChange={this.handleUserInput}
                onBlur={this.handleBlur}
              />
              {!this.state.address && this.state.touched.address && (
                <span className="warehouse-form__error">
                  <img className="warehouse-form__error-icon" src={errorIcon} alt='error'/>
                  <p className="warehouse-form__error-message">
                    This field is required
                  </p>
                </span>
              )}
            </label>

            <label className="warehouse-form__label" htmlFor="city">
              City
              <input
                className={
                  this.state.city || !this.state.touched.city
                    ? "warehouse-form__input"
                    : " warehouse-form__input warehouse-form__input--invalid"
                }
                name="city"
                value={this.state.city}
                placeholder="City"
                onChange={this.handleUserInput}
                onBlur={this.handleBlur}
              />
              {!this.state.city && this.state.touched.city && (
                <span className="warehouse-form__error">
                  <img className="warehouse-form__error-icon" src={errorIcon} alt='error' />
                  <p className="warehouse-form__error-message">
                    This field is required
                  </p>
                </span>
              )}
            </label>

            <label className="warehouse-form__label" htmlFor="country">
              Country
              <input
                className={
                  this.state.country || !this.state.touched.country
                    ? "warehouse-form__input"
                    : " warehouse-form__input warehouse-form__input--invalid"
                }
                name="country"
                placeholder="Country"
                value={this.state.country}
                onChange={this.handleUserInput}
                onBlur={this.handleBlur}
              />
              {!this.state.country && this.state.touched.country && (
                <span className="warehouse-form__error">
                  <img className="warehouse-form__error-icon" src={errorIcon} alt='error' />
                  <p className="warehouse-form__error-message">
                    This field is required
                  </p>
                </span>
              )}
            </label>
          </fieldset>

          <fieldset className="warehouse-form__section warehouse-form__section--contact">
            <h2 className="warehouse-form__heading">Contact Details</h2>
            <label className="warehouse-form__label" htmlFor="name">
              Contact Name
              <input
                className={
                  this.state.name || !this.state.touched.name
                    ? "warehouse-form__input"
                    : " warehouse-form__input warehouse-form__input--invalid"
                }
                name="name"
                value={this.state.name}
                placeholder="Contact Name"
                onChange={this.handleUserInput}
                onBlur={this.handleBlur}
              />
              {!this.state.name && this.state.touched.name && (
                <span className="warehouse-form__error">
                  <img className="warehouse-form__error-icon" src={errorIcon}  alt='error'/>
                  <p className="warehouse-form__error-message">
                    This field is required
                  </p>
                </span>
              )}
            </label>

            <label className="warehouse-form__label" htmlFor="position">
              Position
              <input
                className={
                  this.state.position || !this.state.touched.position
                    ? "warehouse-form__input"
                    : " warehouse-form__input warehouse-form__input--invalid"
                }
                name="position"
                value={this.state.position}
                placeholder="Position"
                onChange={this.handleUserInput}
                onBlur={this.handleBlur}
              />
              {!this.state.position && this.state.touched.position && (
                <span className="warehouse-form__error">
                  <img className="warehouse-form__error-icon" src={errorIcon}  alt='error' />
                  <p className="warehouse-form__error-message">
                    This field is required
                  </p>
                </span>
              )}
            </label>

            <label className="warehouse-form__label" htmlFor="phone">
              Phone Number
              <input
                className={
                  !this.state.touched.phone ||
                  (this.isPhoneValid() && this.state.phone)
                    ? "warehouse-form__input"
                    : " warehouse-form__input warehouse-form__input--invalid"
                }
                name="phone"
                value={this.state.phone}
                placeholder="Phone Number"
                type="tel"
                onChange={this.handleUserInput}
                onBlur={this.handleBlur}
              />
              {!this.state.phone && this.state.touched.phone && (
                <span className="warehouse-form__error">
                  <img className="warehouse-form__error-icon" src={errorIcon}  alt='error' />
                  <p className="warehouse-form__error-message">
                    This field is required
                  </p>
                </span>
              )}
              {this.state.touched.phone && !this.isPhoneValid() && (
                <span className="warehouse-form__error">
                  <img className="warehouse-form__error-icon" src={errorIcon}  alt='error' />
                  <p className="warehouse-form__error-message">
                    Phone number must follow XXX-XXX-XXXX format
                  </p>
                </span>
              )}
            </label>

            <label className="warehouse-form__label" htmlFor="email">
              Email
              <input
                className={
                  !this.state.touched.email ||
                  (this.isEmailValid() && this.state.email)
                    ? "warehouse-form__input"
                    : "warehouse-form__input warehouse-form__input--invalid"
                }
                name="email"
                value={this.state.email}
                placeholder="Email"
                type="email"
                onChange={this.handleUserInput}
                onBlur={this.handleBlur}
              />
              {this.state.touched.email && !this.state.email && (
                <span className="warehouse-form__error">
                  <img className="warehouse-form__error-icon" src={errorIcon}  alt='error' />
                  <p className="warehouse-form__error-message">
                    This field is required
                  </p>
                </span>
              )}
              {this.state.touched.email && !this.isEmailValid() && (
                <span className="warehouse-form__error">
                  <img className="warehouse-form__error-icon" src={errorIcon}  alt='error' />
                  <p className="warehouse-form__error-message">
                    Email address must include an @ sign
                  </p>
                </span>
              )}
            </label>
          </fieldset>

          <div className="warehouse-form__button-wrapper">
            {/* CTA button first in HTML for keyboarding order, reversed visually with flex:row-reverse */}
            <button
              className="warehouse-form__button warehouse-form__button--CTA-2"
              disabled={!this.isFormValid()}>
              + Add Warehouse
            </button>
            <button
              className=" warehouse-form__button warehouse-form__button--cancel"
              type="reset"
              onClick={this.handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNewWarehouse;
