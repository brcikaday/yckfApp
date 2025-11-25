

// Save authentication info safely by role
export const setAuth = (role, token) => {
  localStorage.setItem(`${role}_token`, token);
  localStorage.setItem(`${role}_role`, role);
};

// Get authentication info by role
export const getAuth = (role) => {
  const token = localStorage.getItem(`${role}_token`);
  const storedRole = localStorage.getItem(`${role}_role`);
  return token && storedRole ? { token, role: storedRole } : null;
};

// Clear authentication info by role
export const clearAuth = (role) => {
  localStorage.removeItem(`${role}_token`);
  localStorage.removeItem(`${role}_role`);
};
