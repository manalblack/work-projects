const DUMMY_EVENTS = [
  {
    id: 1,
    title: "Lagos Summer Jam 2026",
    description: "The biggest beach concert of the year featuring top Afrobeats artists.",
    date: "2026-01-15",
    time: "18:00",
    location: "Landmark Beach, VI",
    vip_price: 4000,
    regular_price: 2000,
    category: "Concert",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    availableTickets: 50,
    totalTickets: 200
  },
  // {
  //   id: 2,
  //   title: "Tech Innovators Forum",
  //   description: "Connect with the minds shaping the future of African technology.",
  //   date: "2026-02-10",
  //   time: "09:00",
  //   location: "Civic Centre, Victoria Island",
  //   price: 5000,
  //   category: "Conference",
  //   image: "https://images.unsplash.com/photo-1540575861501-7ad0582373f2?auto=format&fit=crop&w=800&q=80",
  //   availableTickets: 12,
  //   totalTickets: 100
  // },
  {
    id: 3,
    title: "The Laugh Factory: Live",
    description: "A night of unfiltered comedy with the best stand-up acts in the city.",
    date: "2026-02-14",
    time: "19:30",
    location: "Muson Center, Onikan",
    vip_price: 6000,
    regular_price: 2500,
    category: "Comedy",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    availableTickets: 0, // Testing a "Sold Out" state
    totalTickets: 150
  },
  {
    id: 4,
    title: "Startup Founders Brunch",
    description: "Intimate networking session for early-stage startup founders.",
    date: "2026-03-05",
    time: "11:00",
    location: "The Metaphor, Lagos",
    vip_price: 3500,
    regular_price: 2200,
    category: "Networking",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    availableTickets: 85,
    totalTickets: 100
  }
];

export default DUMMY_EVENTS;