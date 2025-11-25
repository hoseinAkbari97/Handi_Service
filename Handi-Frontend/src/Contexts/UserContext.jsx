import {
  createContext,
  useState,
  useEffect,
  useCallback,
useMemo
} from "react";
import { Navigate } from "react-router-dom";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const saveUser = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  const requestOTP = useCallback(async (phone) => {
    const url = "http://127.0.0.1:8000/api/auth/request-otp/";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (!response.ok) {
        throw new Error("ارسال پیامک با خطا مواجه شد.");
      }
    } catch (error) {
      console.error("Request OTP failed:", error);
      throw error;
    }
  }, []);

  const verifyAndLogin = useCallback(
    async (phone, otp, role) => {
      const verifyUrl = "http://127.0.0.1:8000/api/auth/verify-otp/";
      let tokenData;
      try {
        const verifyResponse = await fetch(verifyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, otp }),
        });

        if (!verifyResponse.ok) {
          alert("کد وارد شده نامعتبر است.");
          throw new Error("OTP not valid");
        }
        tokenData = await verifyResponse.json();
      } catch (error) {
        console.error("OTP verification failed:", error);
        throw error;
      }

      const accessToken = tokenData.access;
      let dashboardUrl;
      let errorMessage;
      let redirectPath;

      switch (role) {
        case "customer":
          dashboardUrl =
            "http://127.0.0.1:8000/api/service/dashboard/customer/";
          errorMessage = "مشتری با این شماره وجود ندارد";
          redirectPath = "/customer";
          break;
        case "technician":
          dashboardUrl =
            "http://127.0.0.1:8000/api/service/dashboard/technician/";
          errorMessage = "تعمیرکار با این شماره وجود ندارد";
          redirectPath = "/technician";
          break;
        case "agent":
          dashboardUrl = "http://127.0.0.1:8000/api/service/dashboard/representative/";
          errorMessage = "نماینده‌ای با این شماره وجود ندارد";
          redirectPath = "/agent";
          break;
        default:
          throw new Error("نقش کاربری نامعتبر است.");
      }

      try {
        const dashboardResponse = await fetch(dashboardUrl, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!dashboardResponse.ok) {
          if (dashboardResponse.status === 403) {
            alert(errorMessage);
          }
          throw new Error("خطا در دریافت اطلاعات داشبورد.");
        }

        const userData = await dashboardResponse.json();

        saveUser({ ...userData, access: accessToken });
        localStorage.setItem("role", userData.profile.user_type);
        localStorage.setItem("isValid", "true");

        return redirectPath;
      } catch (error) {
        console.error("Dashboard data fetch failed:", error);
        throw error;
      }
    },
    [saveUser]
  );

  const reFetchUser = useCallback(async () => {
    if (!user || !user.access || !user.profile || !user.profile.user_type) {
      console.error("User or Access Token not available for refetch.");
      return;
    }

    const role = user.profile.user_type;
    const accessToken = user.access;

    let dashboardUrl;

    switch (role) {
      case "customer":
        dashboardUrl = "http://127.0.0.1:8000/api/service/dashboard/customer/";
        break;
      case "technician":
        dashboardUrl =
          "http://127.0.0.1:8000/api/service/dashboard/technician/";
        break;
      case "agent":
        dashboardUrl = "http://127.0.0.1:8000/api/service/dashboard/agent/";
        break;
      default:
        return;
    }

    try {
      const response = await fetch(dashboardUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok || !accessToken) {
        console.error("Failed to refetch user data. Status:", response.status);
        logout();
        return;
      }

      const newUserData = await response.json();

      saveUser({ ...newUserData, access: accessToken });
    } catch (error) {
      console.error("Error during user refetch:", error);
    }
  }, [user, saveUser]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("isValid");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    Navigate((to = "/"));
  }, [Navigate]);

  const contextValue = useMemo(
    () => ({
      user,
      saveUser,
      requestOTP,
      verifyAndLogin,
      reFetchUser,
      logout,
    }),
    [user, saveUser, requestOTP, verifyAndLogin, reFetchUser, logout]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
