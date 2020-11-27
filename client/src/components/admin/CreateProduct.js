import React, { useContext, useState } from 'react';
import roleContext from '../../context/role/roleContext';


const CreateProduct = () => {

   const { categories, createCategory, createProduct, message } = useContext(roleContext);

   const [category, setCategory] = useState({
      name: ''
   });

   const [product, setProduct] = useState({
      name: '',
      description: '',
      image: '',
      category: '',
      price: 0,
      stock: 0,
      shipping: false
   });


   const handleCategory = (e) => {
      setCategory({ ...category, [e.target.name]: e.target.value });
   }

   const handleProduct = (e) => {
      setProduct({ ...product, [e.target.name]: e.target.value });
   }

   const handleImage = (e) => {
      let file = e.target.files[0];
      setProduct({ ...product, image: file });
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      let bodyFormData = new FormData();

      bodyFormData.append('image', product.image);
      bodyFormData.set('name', product.name);
      bodyFormData.set('description', product.description);
      bodyFormData.set('category', product.category);
      bodyFormData.set('price', product.price);
      bodyFormData.set('stock', product.stock);
      bodyFormData.set('shipping', product.shipping);

      createProduct(bodyFormData);
   }


   return (
      <>
         <div className="container mt-5">
            <h2 className="text-info">Create Product</h2>
            <form
               onSubmit={handleSubmit}
               className="ml-3"
            >
               <div className="form-group mt-4">
                  <label>Product name</label>
                  <input type="text" name="name" className="form-control" onChange={handleProduct} required />
               </div>

               <div className="form-group mt-4">
                  <label>Description</label>
                  <textarea name="description" className="form-control" rows="3" onChange={handleProduct} required></textarea>
               </div>

               <div className="form-row mt-4">
                  <div className="col-auto">
                     <label>Image</label>
                     <div className="custom-file mb-3">
                        <input type="file" name="image" className="custom-file-input" onChange={handleImage} required />
                        <label className="custom-file-label">Choose image...</label>
                        <small className="form-text text-muted">Types valid: .jpg or .png</small>
                     </div>
                  </div>
               </div>

               <div className="form-row mt-4">
                  <div className="col-auto">
                     <label>Category</label>
                     <select className="custom-select" name="category" onChange={handleProduct} required>
                        <option value="" hidden>Choose...</option>
                        {categories.map(category =>
                           <option
                              key={category._id}
                              value={category._id}
                           >{category.name}</option>
                        )}
                     </select>
                     <div className="form-group d-flex mt-3">
                        <input type="text" name="name" className="form-control" placeholder="New Category..." onChange={handleCategory} />
                        <button type="submit" className="btn btn-secondary ml-2" onClick={() => createCategory(category)}>Add</button>
                     </div>
                  </div>
               </div>

               <div className="form-row mt-3">
                  <div className="col-auto">
                     <label>Price</label>
                     <input type="number" min="0" step="any" name="price" className="form-control" onChange={handleProduct} required />
                  </div>
               </div>

               <div className="form-row mt-4">
                  <div className="col-auto">
                     <label>Stock</label>
                     <input type="number" min="0" name="stock" className="form-control" onChange={handleProduct} required />
                  </div>
               </div>

               <div className="form-row mt-4">
                  <div className="col-auto">
                     <label>Shipping</label>
                     <div className="form-check">
                        <input type="radio" name="shipping" value={true} id="yes" className="form-check-input" onChange={handleProduct} />
                        <label htmlFor="yes" className="form-check-label">Yes</label>
                     </div>
                     <div className="form-check">
                        <input type="radio" name="shipping" value={false} id="no" className="form-check-input" onChange={handleProduct} />
                        <label htmlFor="no" className="form-check-label">No</label>
                     </div>
                  </div>
               </div>
               {!message
                  ?
                  <button className="btn btn-primary my-5">Create Product</button>
                  :
                  <div className="alert alert-danger text-center my-5 p-2">{message}</div>
               }
            </form>
         </div>
      </>
   );
}

export default CreateProduct;