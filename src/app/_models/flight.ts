export interface Flight {
    flightNumber: number;
    arrivalTime: string; 
    departureTime: string;
    fromCity: string;
    toCity: string;
    airportCode: string;
    aircraftId: string;
    ticketPrice: number;
    ticketPriceCurrency: string;
}