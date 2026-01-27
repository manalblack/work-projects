import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HeroNav from "../components/HeroNav";
import UpcomingEvents from "../components/UpcomingEvents";
import Header from "../components/Header";
import Card from "../components/Card";
import Celebrations from "../components/Celebrations";
import Mission from "../components/Mission";
import SocialContact from "../components/SocialContact";
import Footer from "../components/Footer";


/** NAMECHEAP DOMAIN ISSUE PLEASE GO TO YOUR EMAIL AND SOLVE THIS ISSUE. ASAP */


export default function Home() {

    return (
        <div className="bg-lightPurple flex flex-col justify-between items-center h-screen pt-8">
            <Navbar />
            <main className="bg-lightPurple h-auto w-full flex flex-col gap-5 md:gap-15 justify-center items-center  lg:mt-5 md:mt-10 grow mb-5">  
                <HeroNav />
                <Hero />

                <Header>
                    Upcoming Events
                </Header>
                <UpcomingEvents />
                
                <Header>
                    Our Celebrations
                </Header>
                <Celebrations />
            
                <Header>
                    Our Mission
                </Header>
                <Mission/>

                <Header>
                    Our Social Media
                </Header>
                <SocialContact />
            </main>

            <Footer/>
        </div>
    )
} 