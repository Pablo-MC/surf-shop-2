import { Fragment } from 'react';

const CarouselItem = (props) => {
  return (
    <Fragment>
      <img src={props.img} alt="Img" />
      <div className="carousel-caption d-none d-md-block">
        <h2 className="carousel-phrase">{props.text}</h2>
        <i className="fa fa-chevron-down fa-2x mb-2"></i>
      </div>
    </Fragment>
  );
}

export default CarouselItem;