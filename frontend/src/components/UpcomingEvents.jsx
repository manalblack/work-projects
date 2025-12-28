import Card from "./Card";
import EventCard from "./EventCard";
import Header from "./Header";



export default function UpcomingEvents(){

    return (
        <div className="flex flex-row overflow-x-auto gap-6 scrollbar-hide snap-x bg-darkPurple w-full items-center h-100 p-5 px-4">
            {/* <span className="m-auto">Swipe to see</span> */}
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
        </div>
    )
}