import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./EditWarehouse.scss";
import backArrow from "../../assets/icons/arrow_back-24px.svg";
import errorIcon from "../../assets/icons/error-24px.svg";

const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_SERVER_URL_BACKUP;

class EditWarehouse extends Component {
  componentDidMount() {
    axios
      .get(`${SERVER_URL}/warehouses/${this.props.match.params.id}`)
      .then((res) => {
        const warehouse = res.data;
        this.setState({
          warehouseId: warehouse.id,
          warehouseName: warehouse.name,
          address: warehouse.address,
          city: warehouse.city,
          country: warehouse.country,
          name: warehouse.contact.name,
          position: warehouse.contact.position,
          phone: warehouse.contact.phone,
          email: warehouse.contact.email,
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
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (
      this.state.warehouseName === "" ||
      this.state.address === "" ||
      this.state.city === "" ||
      this.state.country === "" ||
      this.state.name === "" ||
      this.state.position === "" ||
      this.state.phone === "" ||
      this.state.email === ""
    ) {
      alert("Please fill out all fields");
    } else {
      axios
        .put(`${SERVER_URL}/warehouses/${this.props.match.params.id}`, {
          warehouseName: this.state.warehouseName,
          address: this.state.address,
          city: this.state.city,
          country: this.state.country,
          name: this.state.name,
          position: this.state.position,
          phone: this.state.phone,
          email: this.state.email,
        })
        .then((res) => {
          console.log(res);
          alert("Warehouse updated successfully");
          this.props.history.push(`/warehouse`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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

  handleNameOnChange = (e) => {
    this.setState({ warehouseName: e.target.value });
  };

  handleAddressOnChange = (e) => {
    this.setState({ address: e.target.value });
  };

  handleCityOnChange = (e) => {
    this.setState({ city: e.target.value });
  };

  handleCountryOnChange = (e) => {
    this.setState({ country: e.target.value });
  };

  handleContactNameOnChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleContactPositionOnChange = (e) => {
    this.setState({ position: e.target.value });
  };

  handleContactPhoneOnChange = (e) => {
    this.setState({ phone: e.target.value });
  };

  handleContactEmailOnChange = (e) => {
    this.setState({ email: e.target.value });
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
          <Link
            className="main-heading__nav-link"
            to={`/warehouse/${this.props.match.params.id}`}>
            <img
              className="main-heading__nav-icon"
              src={backArrow}
              alt="go back"
            />
          </Link>
          <h1>Edit Warehouse</h1>
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
                value={this.state.warehouseName}
                onChange={this.handleNameOnChange}
                onBlur={this.handleBlur}
              />
              {!this.state.warehouseName && this.state.touched.warehouseName && (
                <span className="warehouse-form__error">
                  <img
                    className="warehouse-form__error-icon"
                    src={errorIcon}
                    alt="error"
                  />
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
                onChange={this.handleAddressOnChange}
                onBlur={this.handleBlur}
              />
              {!this.state.address && this.state.touched.address && (
                <span className="warehouse-form__error">
                  <img
                    className="warehouse-form__error-icon"
                    src={errorIcon}
                    alt="error"
                  />
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
                onChange={this.handleCityOnChange}
                onBlur={this.handleBlur}
              />
              {!this.state.city && this.state.touched.city && (
                <span className="warehouse-form__error">
                  <img
                    className="warehouse-form__error-icon"
                    src={errorIcon}
                    alt="error"
                  />
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
                onChange={this.handleCountryOnChange}
                onBlur={this.handleBlur}
              />
              {!this.state.country && this.state.touched.country && (
                <span className="warehouse-form__error">
                  <img
                    className="warehouse-form__error-icon"
                    src={errorIcon}
                    alt="error"
                  />
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
                placeholder="Contact Name"
                value={this.state.name}
                onChange={this.handleContactNameOnChange}
                onBlur={this.handleBlur}
              />
              {!this.state.name && this.state.touched.name && (
                <span className="warehouse-form__error">
                  <img
                    className="warehouse-form__error-icon"
                    src={errorIcon}
                    alt="error"
                  />
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
                placeholder="Position"
                value={this.state.position}
                onChange={this.handleContactPositionOnChange}
                onBlur={this.handleBlur}
              />
              {!this.state.position && this.state.touched.position && (
                <span className="warehouse-form__error">
                  <img
                    className="warehouse-form__error-icon"
                    src={errorIcon}
                    alt="error"
                  />
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
                  this.state.phone || !this.state.touched.phone
                    ? "warehouse-form__input"
                    : " warehouse-form__input warehouse-form__input--invalid"
                }
                name="phone"
                placeholder="Phone Number"
                type="tel"
                value={this.state.phone}
                onChange={this.handleContactPhoneOnChange}
                onBlur={this.handleBlur}
              />
              {!this.state.phone && this.state.touched.phone && (
                <span className="warehouse-form__error">
                  <img
                    className="warehouse-form__error-icon"
                    src={errorIcon}
                    alt="error"
                  />
                  <p className="warehouse-form__error-message">
                    This field is required
                  </p>
                </span>
              )}
              {!this.state.phone && !this.isPhoneValid() && (
                <span className="warehouse-form__error">
                  <img
                    className="warehouse-form__error-icon"
                    src={errorIcon}
                    alt="error"
                  />
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
                  !this.state.email || !this.state.touched.email
                    ? "warehouse-form__input"
                    : "warehouse-form__input warehouse-form__input--invalid"
                }
                name="email"
                placeholder="Email"
                type="email"
                value={this.state.email}
                onChange={this.handleContactEmailOnChange}
                onBlur={this.handleBlur}
              />
              {!this.state.email && this.state.touched.email && (
                <span className="warehouse-form__error">
                  <img
                    className="warehouse-form__error-icon"
                    src={errorIcon}
                    alt="error"
                  />
                  <p className="warehouse-form__error-message">
                    This field is required
                  </p>
                </span>
              )}
              {!this.state.email && !this.isEmailValid() && (
                <span className="warehouse-form__error">
                  <img
                    className="warehouse-form__error-icon"
                    src={errorIcon}
                    alt="error"
                  />
                  <p className="warehouse-form__error-message">
                    Email address must include an @ sign
                  </p>
                </span>
              )}
            </label>
          </fieldset>

          <div className="warehouse-form__button-wrapper">
            {/* CTA button first in HTML for keyboarding order, reversed visually with flex:row-reverse */}
            <button className="warehouse-form__button warehouse-form__button--CTA">
              Save
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

export default EditWarehouse;
