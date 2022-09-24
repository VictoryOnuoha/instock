import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import editIcon from "../../assets/icons/edit-24px.svg";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
import "./ItemDetails.scss";

const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_SERVER_URL_BACKUP;

class ItemDetails extends Component {
  state = { itemDetails: {} };
  itemId = this.props.match.params.id;

  componentDidMount() {
    axios
      .get(`${SERVER_URL}/inventories/${this.itemId}`)
      .then((res) => {
        this.setState({ itemDetails: res.data[0] });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.itemDetails === {}) {
      return <h1>Loading...</h1>;
    }

    return (
      <main className="main-container">
        <section className="main-heading">
          <Link to="/inventory" className="main-heading__nav-link">
            <img
              className="main-heading__back-button"
              src={arrowBack}
              alt="Go back"
            />
          </Link>
          <h1 className="main-heading__title">
            {this.state.itemDetails.itemName}
          </h1>
          <Link to={`./${this.itemId}/edit`} className="main-heading__nav-link main-heading__nav-link--right">
            <img
              className="main-heading__edit-icon"
              src={editIcon}
              alt="edit"
            />
          </Link>
        </section>

        <article className="item-details">
          <section className="item-details__section item-details__section--left">
            <p className="item-details__label">ITEM DESCRIPTION:</p>
            <p className="item-details__text">
              {this.state.itemDetails.description}
            </p>
            <p className="item-details__label">CATEGORY:</p>
            <p className="item-details__text">
              {this.state.itemDetails.category}
            </p>
          </section>
          <section className="item-details__section item-details__section--right">
            <div className="item-details__group">
              <div className="item-details__wrapper">
                <p className="item-details__label">STATUS:</p>
                <p
                  className={
                    this.state.itemDetails.status === "In Stock"
                      ? "item-details__pill item-details__pill--green"
                      : "item-details__pill item-details__pill--red"
                  }>
                  {this.state.itemDetails.status}
                </p>
              </div>
              <div className="item-details__wrapper--col">
                <p className="item-details__label">QUANTITY:</p>
                <p className="item-details__text">
                  {this.state.itemDetails.quantity}
                </p>
              </div>
            </div>
            <div className="item-details__wrapper">
              <p className="item-details__label">WAREHOUSE:</p>
              <p className="item-details__text">
                {this.state.itemDetails.warehouseName}
              </p>
            </div>
          </section>
        </article>
      </main>
    );
  }
}

export default ItemDetails;
