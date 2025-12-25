import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HeroNav from "../components/HeroNav";


export default function Home() {

    return (
        <>
            <Navbar />
            <div className="bg-lightPurple h-screen w-full flex flex-col gap-20 justify-center items-center">  
                <HeroNav />
                <Hero />
            </div>
        </>
    )
}