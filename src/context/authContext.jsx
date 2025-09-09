import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const login = async (email, password) => {
    if (email && password) {
      const userData = {
        id: Date.now(),
        email,
        name: email.split("@")[0],
      };
      saveUser(userData);
      return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
  };

  const signup = async (name, email, password) => {
    if (name && email && password) {
      const userData = {
        id: Date.now(),
        email,
        name,
      };

      const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
      savedUsers.push(userData);
      localStorage.setItem('users',JSON.stringify(savedUsers));

      saveUser(userData);
      localStorage.setItem("user",JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "All fields are required" };
  };

  const logout = () => clearUser();

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
