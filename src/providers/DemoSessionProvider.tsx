"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { DemoSession, User } from "@/types";
import {
  DEMO_USERS,
  DEMO_CHILD_PROFILES,
  DEMO_FAMILY,
  DEMO_FAMILY_MEMBERS,
} from "@/lib/demo-data";

const STORAGE_KEY = "fw_demo_user";

const SESSION_MAP: Record<string, DemoSession> = {
  santiago: {
    user: DEMO_USERS.santiago,
    family: { ...DEMO_FAMILY, members: DEMO_FAMILY_MEMBERS },
  },
  daniel: {
    user: DEMO_USERS.daniel,
    childProfile: DEMO_CHILD_PROFILES.daniel,
    family: { ...DEMO_FAMILY, members: DEMO_FAMILY_MEMBERS },
  },
  mateo: {
    user: DEMO_USERS.mateo,
    childProfile: DEMO_CHILD_PROFILES.mateo,
    family: { ...DEMO_FAMILY, members: DEMO_FAMILY_MEMBERS },
  },
  joe: {
    user: DEMO_USERS.joe,
    family: { ...DEMO_FAMILY, members: DEMO_FAMILY_MEMBERS },
  },
};

interface SessionContextValue {
  session: DemoSession;
  switchUser: (key: string) => void;
  currentKey: string;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function DemoSessionProvider({ children }: { children: React.ReactNode }) {
  const [currentKey, setCurrentKey] = useState("santiago");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SESSION_MAP[stored]) {
      setCurrentKey(stored);
    }
  }, []);

  function switchUser(key: string) {
    if (SESSION_MAP[key]) {
      localStorage.setItem(STORAGE_KEY, key);
      setCurrentKey(key);
    }
  }

  return (
    <SessionContext.Provider
      value={{ session: SESSION_MAP[currentKey], currentKey, switchUser }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within DemoSessionProvider");
  return ctx;
}
