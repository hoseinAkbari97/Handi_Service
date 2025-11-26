import { useContext, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";

export default function DataRefresher() {
    const { user, reFetchUser } = useContext(UserContext);

    useEffect(() => {
        if (user && user.access) {
            const intervalId = setInterval(() => {
                reFetchUser();
            }, 5000);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [user, reFetchUser]);

    return null;
}