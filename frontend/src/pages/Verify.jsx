import { useParams, useSearchParams } from "react-router-dom";




export default function Verify() {


    const { ticketId } = useParams();
    const [searchParams] = useSearchParams();
    const ticketType = searchParams.get('type');

    const pass = localStorage.getItem('pass')

    // if(pass !== 'staff_member'){
    //     alert('you are not authorized to see this page');

    // } else{
    //     alert('welcome staff !!')
    // }



    return(
        <div>
            <h1>verify ticket</h1>
            <p>Ticket id: {ticketId}</p>
            <p>category: {ticketType}</p>
        </div>
    )


}