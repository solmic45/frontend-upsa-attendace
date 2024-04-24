// src/utils/localStorage.ts
// export const saveTokenToLocalStorage = async(key , value )  => {
//     try {
//       await localStorage.setItem(key, JSON.stringify(value));
//     } catch (error) {
//       console.error('Error saving to local storage:', error);
//     }
//   };
  
  // export const loadTokenFromLocalStorage = async(key ) => {
  //   try {
  //     const serializedValue = await localStorage.getItem(key);
  //      return serializedValue ? JSON.parse(serializedValue) : null;
  
  //   } catch (error) {
  //     console.error('Error loading from local storage:', error);
  //     return null;
  //   }
  // };

  export const saveTokenToLocalStorage = (key, value) => {
    try {
        // Check if the value is not undefined
        if (value !== undefined) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            console.error('Error saving to local storage: Value is undefined');
        }
    } catch (error) {
      console.error('Error saving to local storage:', error);
           }
  }

  export const loadTokenFromLocalStorage = (key) => {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue !== undefined && serializedValue !== null) {
            return JSON.parse(serializedValue);
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error loading from local storage:', error);
        return null;
    }
};

export const removeTokenFromLocalStorage = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from local storage:', error);
    }
};