import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import sortArrow from "../../assets/icons/sort-24px.svg";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import axios from "axios";
import "./InventoryList.scss";
import "../WarehouseDetails/WarehouseDetails.scss";
import React from "react";
import DeleteItemModal from "../Modals/DeleteItemModal";

const SERVER_URL =
process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_SERVER_URL_BACKUP;

class InventoryList extends React.Component{
  state = {
    showModal: false,
    itemID: "",
    inventoryData: this.props.inventoryData
  }

  showModal = (id) => {
    this.setState({
      showModal: true,
      itemID: id,
    });
  }

    closeModal = () => {
      this.setState({
        showModal: false,
      });
    }

    handleDelete = () => {
      axios.delete(`${SERVER_URL}/inventories/${this.state.itemID}`)
        .then(res => {
          this.setState({
            showModal: false,
            inventoryData: res.data,
          });
          console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    }    
render() {
  let modal = <></>
    if (this.state.showModal) {
      modal = <DeleteItemModal closeModal={this.closeModal} delete={() => this.handleDelete(this.state.itemID)} 
      />
    } 

    if (!this.props.inventoryData) {
      return <h1>Loading...</h1>;
    }    
  return (
    <main className="inventory-list">
      <article className="inventory-list__header">
        <h1 className="inventory-list__title">Inventory</h1>
        <div className="inventory-list-nav">
          <SearchBar className="inventory-list-search" />
          <Link to="/inventory/add">
          <button
            className="inventory-list-nav__button">
            + Add New Item
          </button>
          </Link>
        </div>
      </article>

      <article className="inventory-list__tablet-heading">
        {/* { Hide this in mobile} */}
        <div className="details__header">
          <p className="details__inventory-title details__header--selected">
            INVENTORY ITEM
          </p>
          <section>
            <img
              className="details__sort-arrows details__sort-arrows--selected"
              src={sortArrow} alt='sort'
            />
          </section>
        </div>

        <div className="details__header">
          <p className="details__category details__header--selected">
            CATEGORY
          </p>
          <section>
            <img
              className="details__sort-arrows details__sort-arrows--selected"
              src={sortArrow}  alt='sort'
            />
          </section>
        </div>
        <div className="details__header">
          <p className="details__inventory-status details__header--selected">
            STATUS
          </p>
          <section>
            <img
              className="details__sort-arrows details__sort-arrows--selected"
              src={sortArrow}  alt='sort'
            />
          </section>
        </div>

        <div className="details__header details__header-quantity">
          <p className="details__quantity details__header--selected">QTY</p>
          <section>
            <img
              className="details__sort-arrows details__sort-arrows--selected"
              src={sortArrow}  alt='sort'
            />
          </section>
        </div>

        <div className="details__header">
          <p className="details__quantity details__header--selected">
            WAREHOUSE
          </p>
          <section>
            <img
              className="details__sort-arrows details__sort-arrows--selected"
              src={sortArrow}  alt='sort'
            />
          </section>
        </div>

        <div className="details__header">
          <p className="details__inventory-action">ACTIONS</p>
        </div>
      </article>

      {this.props.inventoryData.map((inventory) => (
        <article className="details__inventory" key={inventory.id}>
          <section className="details__inventory-box">
            <p className="details__inventory-title details__header--selected details__mobile">
              INVENTORY ITEM
            </p>

            {/* { Add Headings here that are visible in mobile + none in tablet} */}
            <div className="details__item-box">
              <Link className='details__link' to={`/inventory/${inventory.id}`}>
                <p className="details__inventory-item">{inventory.itemName}</p>
                <img className="details__chevron" src={chevronRight} alt='' />
              </Link>
            </div>
          </section>

          <section className="details__inventory-box">
            <p className="details__category details__header--selected details__mobile">
              CATEGORY
            </p>
            <div>
              <p className="details__category-item">{inventory.category}</p>
            </div>
          </section>

          <section className="details__inventory-box">
            <p className="details__inventory-status details__header--selected details__mobile">
              STATUS
            </p>
            <div className="details__stock-box">
              <p className={(inventory.status==="In Stock")?"details__inventory-message details__inventory-message--instock":"details__inventory-message details__inventory-message--outofstock"}>{inventory.status}</p>
            </div>
          </section>

          <section className="details__inventory-box">
            <p className="details__quantity details__header--selected details__mobile">
              QTY
            </p>
            <div>
              <p className="details__quantity-item">{inventory.quantity}</p>
            </div>
          </section>

          <section className="details__inventory-box">
            <p className="details__quantity details__header--selected details__mobile">
              WAREHOUSE
            </p>

            <div>
              <p className="details__warehouse-name">
                {inventory.warehouseName}
              </p>
            </div>
          </section>

          <section className="details__inventory-icon">
            <div className="details__action-icons">
              <img className="details__delete-icon" src={deleteIcon} onClick={()=>{this.showModal(inventory.id)}} alt="delete" />
              <Link to={`/inventory/${inventory.id}/edit`}>
                <img className="details__edit-icon" src={editIcon} alt='edit' />
              </Link>
            </div>
          </section>
        </article>
      ))}
      {modal}
    </main>
  );
};
}

export default InventoryList;
