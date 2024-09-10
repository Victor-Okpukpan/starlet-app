"use client";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/app/firebase"; // Adjust the path based on your project structure
import { collection, getDocs } from "firebase/firestore"; // Import necessary Firestore functions

interface MyContextType {
  isAdmin: boolean;
  creators: Array<any>; // Store creators data
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const session = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [creators, setCreators] = useState<Array<any>>([]); 
  const loggedUser = session.data?.user?.email;

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const creatorsCollectionRef = collection(db, "creators");
        const querySnapshot = await getDocs(creatorsCollectionRef);
        const fetchedCreators = querySnapshot.docs.map((doc) => doc.data());

        // Store creators in state
        setCreators(fetchedCreators);

        // Check if the logged-in user is an admin
        const isUserAdmin = fetchedCreators.some(
          (creator: any) => creator.email === loggedUser
        );
        setIsAdmin(isUserAdmin);
      } catch (error) {
        console.error("Error fetching creators:", error);
      }
    };

    if (loggedUser) {
      fetchCreators();
    }
  }, [loggedUser]);

  return (
    <MyContext.Provider value={{ isAdmin, creators }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
