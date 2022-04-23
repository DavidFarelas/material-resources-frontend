const saveUser = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
};

export default saveUser;