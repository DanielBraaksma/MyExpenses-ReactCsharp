import { stateShape } from "./billSlice";
const initialState: { isAuth: boolean } = {
  isAuth: false,
};

export const userReducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case "authTrue":
      return { isAuth: true };
    case "authFalse":
      return { isAuth: false };
    default:
      return state;
  }
};


//actions

export const authorizeUser =()=>{
    return {
        type: "authTrue"
    }
}

export const logOutUser =()=>{
    return {
        type: "authFalse"
    }
}

//selector

export const selectIsAuth =(state:stateShape)=>{
    return state.user.isAuth
}
