function getTokenFromLocalStorage() {
    try {
      const userStr = localStorage.getItem("token");
      if (userStr) {
        console.log("token found");
        return JSON.parse(userStr);
      }
    } catch (error) {
      console.error("Error parsing token from local storage:", error);
    }
    return null;
  }
  
  export const config = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage()?.token ?? ""}`, // Use optional chaining and nullish coalescing for safer access
      Accept: "application/json",
    },
  };