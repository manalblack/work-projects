import LightPurpleBtn from "./LightPurpleBtn";



export default function Introduction(){

    return(
        <div className="bg-darkPurple w-full flex flex-col gap-8 items-start">

            <h2 className="text-6xl text-white">
                Welcome to Troveista Events
            </h2>
            {/* make this line wider */}
            <hr className="text-lightPurple"/>
            <p className="text-3xl text-white leading-12">
                Your go to platform  for securing tickets to the hottest shows, sports events, and festivals, all in one place.
            </p>
            <LightPurpleBtn>
                Discover
            </LightPurpleBtn>
        </div>
    )
}