import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HeroNav from "../components/HeroNav";


export default function Home() {

    return (
        <div className="bg-lightPurple flex flex-col justify-between items-center ">
            <Navbar />
            {/* I added margin top to this container because the Hero nav was appearing under the nav */}
            <div className="bg-lightPurple h-screen w-full flex flex-col gap-20 justify-center items-center lg:mt-50 md:mt-20">  
               
                <HeroNav />
                <Hero />
            </div>
        </div>
    )
}