import React from 'react';


const Brands = () => {
   return (
      <div className="container">
         <div className="row justify-content-around py-5">
            <img src={require('../../assets/images/brands/lost.png')} alt="Lost" />
            <img src={require('../../assets/images/brands/channel.png')} alt="Channel" />
            <img src={require('../../assets/images/brands/create.png')} alt="Create" />
            <img src={require('../../assets/images/brands/dc.png')} alt="DC" />
            <img src={require('../../assets/images/brands/element.png')} alt="Element" />
            <img src={require('../../assets/images/brands/quicksilver.png')} alt="Quicksilver" />
            <img src={require('../../assets/images/brands/vans.png')} alt="Vans" />
         </div>
      </div>
   );
}

export default Brands;