import Card from "./Card";
import Introduction from "./Introduction";
import MiniOverlay from "./MiniOverlay";
import LightBtn from './LightBtn';
import LightPurpleBtn from './LightPurpleBtn'
import PriceContainer from './PriceContainer'



export default function Hero(){

    return(
        <Card>
            <div className="bg- w-9/10 h-auto flex flex-col justify-center items-center p-6 gap-10">

                <div className="relative w-full group overflow-hidden rounded-xl">
                    <img src="/placeholder.jpg" alt="" className="w-full rounded-sm shadow-lg"/>
                    <MiniOverlay>
                        <div className="bg-black/40 text-white absolute bottom-0 left-0 w-full h-50 flex flex-row justify-between gap-8">
                            <div className="w-3/4 flex flex-col items-start gap-5 bg-gray-00 p-2">
                               <h2 className="text-3xl font-bold">
                                    Black lights event
                                </h2> 
                                <p className="text-lg font-light">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos accusantium vero aliquid, et asperiores distinctio.
                                </p>
                                <PriceContainer>
                                    N3,000
                                </PriceContainer>
                            </div>
                            <div className="bg-blue h-50 w-60 flex flex-col justify-center items-center gap-10">
                                <LightBtn>
                                    About Event
                                </LightBtn>
                                <LightPurpleBtn>
                                    Buy Ticket
                                </LightPurpleBtn>
                            </div>
                        </div>
                    </MiniOverlay>
                </div>
                <Introduction />
            </div>
           
        </Card>
    )
}