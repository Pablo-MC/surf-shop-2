const roleReducer = (state, action) => {
   switch (action.type) {

      case 'GET_USERS':
         return {
            ...state,
            users: action.payload
         }

      case 'GET_USER':
         return {
            ...state,
            user: action.payload
         }

      case 'DELETE_USER':
         return {
            ...state,
            user: null
         }


      case 'GET_PRODUCTS':
         return {
            ...state,
            products: action.payload
         }

      case 'GET_PRODUCT':
         return {
            ...state,
            product: action.payload
         }

      case 'DELETE_PRODUCT':
         return {
            ...state,
            product: null
         }

      case 'PRODUCTS_BY_CATEGORY':
         return {
            ...state,
            productsCategory: action.payload,
            category: action.payload[0].category.name,
            categoryDes: action.payload[0].category.description,
            message: null
         }


      case 'GET_CATEGORIES':
         return {
            ...state,
            categories: action.payload
         }


      case 'IMAGE_TYPE_ERROR':
         return {
            ...state,
            message: action.payload
         }

      case 'EMPTY_CATEGORY':
         return {
            ...state,
            message: action.payload
         }

      case 'HIDE_ALERT':
         return {
            ...state,
            message: null
         }


      default:
         return state;
   }
}

export default roleReducer;