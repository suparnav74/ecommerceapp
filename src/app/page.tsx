import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Herosection from "./components/Herosection";
//import { useSession } from '@/app/providers/sessionProvider';

export default function Home() {
  // const { user } = useSession();
  //           console.log(user);
  //           const userRole = user?.role;
            

  return (
    <>
     {/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"> */}
     
     <div className="bg-white">
      {/* <Navbar/> */}
        {/* <Navbar role={userRole}/> */}
      
     
     <Herosection/>
     </div>
     <Footer/>
     {/* </div> */}
    </>
  );
}
