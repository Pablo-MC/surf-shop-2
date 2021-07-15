const cartReducer = (state, action) => {
   switch (action.type) {

      case 'ADD_PRODUCT':
         return {
            ...state,
            productsCart: [...state.productsCart, action.payload],
            totalPrice: state.totalPrice + action.payload.price
         }

      case 'DELETE_PRODUCT':
         return {
            ...state,
            productsCart: state.productsCart.filter(product => product._id !== action.payload._id)
         }

      case 'DELETE_ALL_PRODUCT':
         return {
            ...state,
            productsCart: [],
            totalPrice: 0
         }

      case 'DECREASE_QUANTITY':
         return {
            ...state,
            productsCart: state.productsCart.map(product => product._id === action.payload._id ? action.payload : product),

            totalPrice: parseFloat(state.totalPrice - (state.productsCart.find(product => product._id === action.payload._id).price))
         }

      case 'INCREASE_QUANTITY':
         return {
            ...state,
            productsCart: state.productsCart.map(product => product._id === action.payload._id ? action.payload : product),

            totalPrice: parseFloat(state.totalPrice + (state.productsCart.find(product => product._id === action.payload._id).price))
         }


      default:
         return state;
   }
}

export default cartReducer;

// El Reducer cambia los States de los componentes. 

// OBS 1: Para cada acción, SIEMPRE se debe hacer una copia del state incial (...state).
// OBS 2: action.payload --> payload contiene valor que se le asigna a la propiedad payload en la fn del dispatch.