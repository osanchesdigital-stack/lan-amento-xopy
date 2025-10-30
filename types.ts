export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
}

export interface Post {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

export interface Passenger {
  user: User;
  ticketId: string;
  status: 'Pendente' | 'Embarcado';
}

export interface Trip {
  id: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  boatId: string;
  price: number;
  availableSeats: number;
  passengers: Passenger[];
}

export interface Boat {
  id: string;
  name: string;
  imageUrl: string;
  capacity: number;
  travelTime: string;
  status: 'Operando' | 'Manutenção' | 'Ancorado';
}

export interface Ticket {
  id: string;
  trip: Trip;
  purchaseDate: string;
  qrCodeData: string;
  status: 'Válido' | 'Utilizado' | 'Expirado';
}