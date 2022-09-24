import './WarehouseListItem.scss';
import chevronRight from '../../assets/icons/chevron_right-24px.svg';
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from '../../assets/icons/edit-24px.svg';
import { Link } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import WarehouseModal from '../Modals/WarehouseModal';

const SERVER_URL =
process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_SERVER_URL_BACKUP;

class WarehouseListItem extends React.Component {
    state = {
        showModal: false
    }

    showModal = (id) => {
        this.setState({
            showModal: true,
            id: id
        });
    }


    closeModal = () => {
        this.setState({
            showModal: false
        });
    }

    handleDelete = () => {
        axios.delete(`${SERVER_URL}/warehouses/${this.props.id}`)
        .then(res => {
            this.setState({
                showModal: false,
            })
        })
        .catch(err => {
            console.log(err);
        })
    }


    render () {
        let modal = <></>
        if (this.state.showModal) {
            modal = <WarehouseModal closeModal={this.closeModal} delete={this.handleDelete} name={this.props.name}/>
        }
    return (
        <article className="warehouse-list-item">
            <div className="warehouse-info">
                <div className="warehouse-info__name-address">
                    <div>
                        <h4>Warehouse</h4>
                        <Link to={`/warehouse/${this.props.id}`}>
                            <p>{this.props.name}</p>
                            <img src={chevronRight} alt=""/>
                        </Link>
                    </div>
                    <div>
                        <h4>Address</h4>
                        <p>{`${this.props.address}, ${this.props.city}, ${this.props.country}`}</p>
                    </div>
                </div>
                <div className="warehouse-info__contacts">
                    <div>
                        <h4>Contact Name</h4>
                        <p>{this.props.contact.name}</p>
                    </div>
                    <div>
                        <h4>Contact Information</h4>
                        <p>{this.props.contact.phone}</p>
                        <p>{this.props.contact.email}</p>
                    </div>
                </div>
            </div>
            <div className="warehouse-actions">
                <img className="delete__icon" src={deleteIcon} alt="delete" onClick={this.showModal}/>
                <Link to={`/warehouse/${this.props.id}/edit`}>
                  <img src={editIcon} alt="edit"/>     
                </Link>
            </div>
            {modal}
        </article>
    );
};
}

export default WarehouseListItem;
