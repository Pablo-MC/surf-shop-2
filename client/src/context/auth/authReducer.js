export default (state, action) => {
   switch (action.type) {

      case 'REGISTER_SUCCESS':
         return {
            ...state,
            registered: true
         }

      case 'REGISTER_FAIL':
         return {
            ...state,
            message: action.payload
         }

      case 'LOGIN_SUCCESS':
         localStorage.setItem('token', action.payload); 
         return {
            ...state,
            authenticated: true,
            token: action.payload,
            message: null
         }

      case 'LOGIN_FAIL':
         return {
            ...state,
            message: action.payload
         }   
      
      case 'GET_USER':
         return {
            ...state,
            authenticated: true,
            user: action.payload
         }   
      
      case 'LOGOUT':
         localStorage.removeItem('token');
         return {
            ...state,
            token: null,
            user: null,
            authenticated: null,
            registered: null,
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