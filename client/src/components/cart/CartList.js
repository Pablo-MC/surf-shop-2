import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart/cart-slice';

const CartList = ({ product }) => {
  const dispatch = useDispatch();
  const { name, imageURL, price, total, quantity, stock } = product;

  const options = {
    style: 'currency',
    currency: 'USD',
  };

  return (
    <div className="row border-bottom border-info text-center align-items-baseline py-4 m-0">
      <div className="col-4 text-justify">
        <img className="w-50 d-inline d-lg-none rounded ml-5" src={imageURL} alt={name} />
        <img className="w-25 d-none d-lg-inline rounded ml-5" src={imageURL} alt={name} />
        <span className="d-none d-lg-inline ml-3">{name}</span>
      </div>

      <div className="col-2 d-none d-lg-block">
        <p>{new Intl.NumberFormat(navigator.language, options).format(price)}</p>
      </div>

      <div className="col-3 col-lg-2 d-none d-sm-block">
        <div className="input-group">
          <span className="input-group-btn">
            <button className="btn btn-danger btn-sm"
              onClick={() => dispatch(cartActions.decreaseQuantity(product))}>
              <i className="fa fa-minus"></i>
            </button>
          </span>

          <input
            className="form-control form-control-sm text-center"
            type="text"
            value={quantity}
            readOnly
          />

          <span className="input-group-btn">
            <button className="btn btn-success btn-sm"
              onClick={() => dispatch(cartActions.increaseQuantity(product))}>
              <i className="fa fa-plus"></i>
            </button>
          </span>
        </div>
        <small className="form-text text-muted">Max quantity: {stock}</small>
      </div>

      <div className="col-4 col-sm-3 col-lg-2">
        <p className="text-center">{new Intl.NumberFormat(navigator.language, options).format(total)}</p>
      </div>

      <div className="col-4 col-sm-2">
        <button className="btn btn-primary btn-sm"
          onClick={() => dispatch(cartActions.removeProductFromCart(product))}>
          <i className="fa fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default CartList;