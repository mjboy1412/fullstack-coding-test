import React, { useContext, useEffect } from "react";

import { AuthContext } from "HOC/AuthProvider";
import { useRouter } from "next/router";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);
  if (!user) return null;
  return <>{children}</>;
};

export default PrivateRoute;
