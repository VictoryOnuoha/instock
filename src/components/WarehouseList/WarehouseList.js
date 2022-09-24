import './WarehouseList.scss';
import { useHistory } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import WarehouseListItem from '../../components/WarehouseListItem/WarehouseListItem';
import sortArrow from '../../assets/icons/sort-24px.svg';

const WarehouseList = ({ warehouseData }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/warehouse/add');
  }

  return (
    <div className="warehouse-list">
        <div className="warehouse-list__header">
            <h1>Warehouses</h1>
            <div className="warehouse-list-nav">
                <SearchBar />
                <button className="warehouse-list-nav__button" onClick={handleClick}>+ Add New Warehouse</button>
            </div>
        </div>
        <div className="warehouse-list__headings">
          <div className="headings-container-1">
            <div>
              <p>Warehouse</p>
              <img src={sortArrow} alt="" />
            </div>

            <div>
              <p>Address</p>
              <img src={sortArrow} alt="" />
            </div>

            <div>
              <p>Contact Name</p>
              <img src={sortArrow} alt="" />
            </div>

            <div>
              <p>Contact Information</p>
              <img src={sortArrow} alt="" />
            </div>
          </div>

          <div className="headings-container-2">
            <p>Actions</p>
          </div>

        </div>
      
      <div className="warehouse-list__items">
        {warehouseData.map((warehouse) => {
          return (
            <WarehouseListItem 
              key={warehouse.id}
              id={warehouse.id}
              name={warehouse.name}
              address={warehouse.address}
              city={warehouse.city}
              country={warehouse.country}
              contact={warehouse.contact}
            />
          )
        })
        }
      </div>
    </div>
  );
};

export default WarehouseList;