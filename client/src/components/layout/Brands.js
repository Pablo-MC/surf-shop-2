import lost from '../../assets/images/brands/lost.png'
import channel from '../../assets/images/brands/channel.png'
import create from '../../assets/images/brands/create.png'
import dc from '../../assets/images/brands/dc.png'
import element from '../../assets/images/brands/element.png'
import quicksilver from '../../assets/images/brands/quicksilver.png'
import vans from '../../assets/images/brands/vans.png'

const Brands = () => {
  return (
    <div className="container">
      <div className="row justify-content-around py-5">
        <img src={lost} alt="Lost" />
        <img src={channel} alt="Channel" />
        <img src={create} alt="Create" />
        <img src={dc} alt="DC" />
        <img src={element} alt="Element" />
        <img src={quicksilver} alt="Quicksilver" />
        <img src={vans} alt="Vans" />
      </div>
    </div>
  );
}

export default Brands;