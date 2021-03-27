import React from "react";
import { useLocation } from "react-router";

import { useAppContext } from "../../contexts/AppContext";

export default function TokenHandler() {
  const { user, setUser } = useAppContext();
  const location = useLocation();

  if (user.token) {
    return null;
  }

  const matchedToken = /(?:\?|&)token=([^=&]*)(?:&?)/gi.exec(location.search);
  const matchedUser = /(?:\?|&)user=([^=&]*)(?:&?)/gi.exec(location.search);

  if (matchedToken && matchedToken[1] && matchedUser && matchedUser[1]) {
    setUser({ token: matchedToken[1], userId: parseInt(matchedUser[1]) });
  }

  return null;
}
