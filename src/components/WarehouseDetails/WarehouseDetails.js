import { Link } from "react-router-dom";
import WarehouseInventoryList from "../WarehouseInventoryList/WarehouseInventoryList";
// import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import arrowBack from "../../assets/icons/arrow_back-24px.svg";
// import chevronRight from "../../assets/icons/chevron_right-24px.svg";
// import sortArrow from "../../assets/icons/sort-24px.svg";
import "./WarehouseDetails.scss";

function WarehouseDetails(props) {

  const warehouseId = props.match.params.id;

  // filter warehouses data to keep only the selected warehouses' details
  const selectedWarehouseArray = Array.from(props.warehouseData).filter(
    (warehouse) => warehouse.id === warehouseId
  );
  const selectedWarehouse = selectedWarehouseArray[0];

  // filter inventory to keep selected warehouse's inventory
  const filteredInventory = Array.from(props.inventoryData).filter(
    (item) => item.warehouseID === selectedWarehouse.id
  );

  if (!props) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="details">
      <section className="details__title-box">
        <div className="details__title-row1">
          <Link to="/warehouse/">
            <img src={arrowBack} alt='go back'/>
          </Link>
          <h2 className="details__title">{selectedWarehouse.name}</h2>
        </div>

        <div className="details__title-row2">
          <Link to={`/warehouse/${warehouseId}/edit`}>
            <img src={editIcon} alt='edit' />
          </Link>
        </div>
      </section>

      <article className="details__address">
        <section className="details__address-box">
          <p className="details__address-title">WAREHOUSE ADDRESS:</p>
          <p className="details__address-location">{`${selectedWarehouse.address}, ${selectedWarehouse.city}, ${selectedWarehouse.country}`}</p>
        </section>

        <article className="details__manager">
          <section className="details__manager-box">
            <p className="details__manager-contact">CONTACT NAME:</p>
            <p className="details__manager-name">
              {selectedWarehouse.contact.name}
            </p>
            <p className="details__manager-title">
              {selectedWarehouse.contact.position}
            </p>
          </section>

          <section className="details__contact">
            <p className="details__contact-info">CONTACT INFORMATION:</p>
            <p className="details__contact-number">
              {selectedWarehouse.contact.phone}
            </p>
            <p className="details__contact-email">
              {selectedWarehouse.contact.email}
            </p>
          </section>
        </article>
      </article>

      <WarehouseInventoryList inventory={filteredInventory} />
    </main>
  );
}

export default WarehouseDetails;
