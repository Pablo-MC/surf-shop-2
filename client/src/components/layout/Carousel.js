import React from 'react';


const Carousel = () => {
   return (
      <div className="carousel slide" id="carouselMain" data-ride="carousel">
         <div className="carousel-inner text-center">
            <div className="carousel-item active">
               <img src={require('../../assets/images/carousel/carousel_1.jpg')} alt="Img-1" />
               <div className="carousel-caption d-none d-md-block">
                  <h2 className="carousel-phrase">Best Waves in the World</h2>
                  <i className="fa fa-chevron-down fa-2x mb-2"></i>
               </div>
            </div>
            <div className="carousel-item">
               <img src={require('../../assets/images/carousel/carousel_2.jpg')} alt="Img-2" />
               <div className="carousel-caption d-none d-md-block">
                  <h2 className="carousel-phrase">Surfing is for Life</h2>
                  <i className="fa fa-chevron-down fa-2x mb-2"></i>
               </div>
            </div>
            <div className="carousel-item">
               <img src={require('../../assets/images/carousel/carousel_3.jpg')} alt="Img-3" />
               <div className="carousel-caption d-none d-md-block">
                  <h2 className="carousel-phrase">Surfers Dream of Us</h2>
                  <i className="fa fa-chevron-down fa-2x mb-2"></i>
               </div>
            </div>
            <div className="carousel-item">
               <img src={require('../../assets/images/carousel/carousel_4.jpg')} alt="Img-4" />
               <div className="carousel-caption d-none d-md-block">
                  <h2 className="carousel-phrase">Your Own Island Paradise</h2>
                  <i className="fa fa-chevron-down fa-2x mb-2"></i>
               </div>
            </div>
         </div>
         <a class="carousel-control-prev" href="#carouselMain" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
         </a>
         <a class="carousel-control-next" href="#carouselMain" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
         </a>
      </div>
   );
}

export default Carousel;