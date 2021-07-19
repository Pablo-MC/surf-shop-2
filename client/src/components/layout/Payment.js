const Payment = () => {
  return (
    <div className="container my-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        <div className="col text-center mx-auto">
          <i className="fa fa-3x fa-credit-card text-info my-4"></i>
          <h5 className="font-weight-bold">Pay by card or cash</h5>
          <p className="lead">With Surf Shop, you have interest free fees with card or cash. And it is always safe!</p>
        </div>
        <div className="col text-center mx-auto">
          <i className="fa fa-3x fa-truck text-info my-4"></i>
          <h5 className="font-weight-bold">Free shipping from $ 1,500</h5>
          <p className="lead">By being registered in Surf Shop you have free shipping on hundreds of products.</p>
        </div>
        <div className="col text-center mx-auto">
          <i className="fa fa-3x fa-handshake-o text-info my-4"></i>
          <h5 className="font-weight-bold">Safety, from start to finish!</h5>
          <p className="lead">You do not like? Give it back!. In Surf Shop you are always protected!</p>
        </div>
      </div>
      <hr className="mt-4" />
    </div>
  );
}

export default Payment;