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
  loading: Boolean;
};
const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setsession] = useState<Session | null>(null);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const FetchSesssion = async () => {
      const { data } = await supabase.auth.getSession();
     setsession(data.session);
      setloading(false);
    };

    FetchSesssion();
     supabase.auth.onAuthStateChange((_event, session)=>{
        setsession(session)
     })
  }, []);
  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
