import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/superbase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
  session: Session | null;
  profile: any;
  loading: Boolean;
  isadmin: Boolean;
};
const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isadmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setsession] = useState<Session | null>(null);
  
  const [profile, setprofile] = useState(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const FetchSesssion = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setsession(session);
      if (session) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setprofile(data || null);
      }
      setloading(false);
    };
    // console.log(profile.grouip);
    console.log(profile);
    FetchSesssion();
    supabase.auth.onAuthStateChange((_event, session) => {
      setsession(session);
    });
  }, []);
  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        profile,
        isadmin: profile?.grouip === "Admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
