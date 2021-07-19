import carousel_1 from '../../../assets/images/carousel/carousel_1.jpg'
import carousel_2 from '../../../assets/images/carousel/carousel_2.jpg'
import carousel_3 from '../../../assets/images/carousel/carousel_3.jpg'
import carousel_4 from '../../../assets/images/carousel/carousel_4.jpg'

import CarouselItem from './CarouselItem';

const Carousel = () => {
  return (
    <div className="carousel slide" id="carouselMain" data-ride="carousel">
      <div className="carousel-inner text-center">
        <div className="carousel-item active">
          <CarouselItem img={carousel_1} text='Best Waves in the World' />
        </div>
        <div className="carousel-item">
          <CarouselItem img={carousel_2} text='Surfing is for Life' />
        </div>
        <div className="carousel-item">
          <CarouselItem img={carousel_3} text='Surfers Dream of Us' />
        </div>
        <div className="carousel-item">
          <CarouselItem img={carousel_4} text='Your Own Island Paradise' />
        </div>
      </div>
      <a className="carousel-control-prev" href="#carouselMain" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselMain" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
}

export default Carousel;