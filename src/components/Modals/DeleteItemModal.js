import React from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DeleteItemModal.scss';
import closeIcon from '../../assets/icons/close-24px.svg';


const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || process.env.REACT_APP_SERVER_URL_BACKUP;

export default class DeleteItemModal extends React.Component {
  render () {
  return (
    <div className="container">
      <div className="modal">
        {/* Will need to receive itemDetails from props */}
        <a href="/inventory" onClick={this.props.closeModal}>
          <img className="modal__x-icon" src={closeIcon} alt="close" />
        </a>
        <h1 className="modal__header">Delete {this.props.name} inventory item?</h1>
        <p className="modal__text">
          Please confirm that you'd like to delete {this.props.name} from the
          inventory list. You won't be able to undo this action.
        </p>
        <div className="modal__button-container">
          {/* When keyboarding, cancel should be first to prevent accidental selection of destructive action */}
          <button
            className="modal__button modal__button--cancel"
            onClick={this.props.closeModal}
          >
            Cancel
          </button>
          <button
            className="modal__button modal__button--delete"
            onClick={this.props.delete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
}

