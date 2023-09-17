import React from 'react';

export default function Modal({ selectedSpace, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img
          src={selectedSpace.links[0].href}
          alt={selectedSpace.data[0].title}
          className="modal-img"
        />
        <h2>{selectedSpace.data[0].title}</h2>
        <h3>NASA ID: {selectedSpace.data[0].nasa_id}</h3>
        <p>{selectedSpace.data[0].description}</p>
        <h3>Date Created: {selectedSpace.data[0].date_created}</h3>
        <h4>Center: {selectedSpace.data[0].center}</h4>
        <h4 className="modal--keyWord">
          Keywords:{' '}
          <a href="{selectedSpace.data[0].keywords}">
            {selectedSpace.data[0].keywords}
          </a>
        </h4>
        <h4>Location: {selectedSpace.data[0].location}</h4>
        <h4>Photographer: {selectedSpace.data[0].secondary_creator}</h4>
        <a href="{selectedSpace.data[0].href}">
          Visit {selectedSpace.data[0].center} Website
        </a>
      </div>
    </div>
  );
}
