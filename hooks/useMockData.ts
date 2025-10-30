import type { User, Post, Trip, Boat, Ticket, Comment, Passenger } from '../types';

const users: User[] = [
  { id: 'u1', name: 'Ana Clara', avatarUrl: 'https://picsum.photos/seed/u1/100/100' },
  { id: 'u2', name: 'Bruno Costa', avatarUrl: 'https://picsum.photos/seed/u2/100/100' },
  { id: 'u3', name: 'Carla Dias', avatarUrl: 'https://picsum.photos/seed/u3/100/100' },
  { id: 'u4', name: 'Diego Martins', avatarUrl: 'https://picsum.photos/seed/u4/100/100' },
  { id: 'u5', name: 'Fernanda Lima', avatarUrl: 'https://picsum.photos/seed/u5/100/100' },
  { id: 'u6', name: 'Gabriel Alves', avatarUrl: 'https://picsum.photos/seed/u6/100/100' },
];

const comments: Comment[] = [
    {id: 'c1', user: users[1], text: 'Que vista incrível!'},
    {id: 'c2', user: users[2], text: 'Amei a foto! Saudades desse lugar.'},
]

const posts: Post[] = [
  {
    id: 'p1',
    user: users[0],
    imageUrl: 'https://picsum.photos/seed/p1/600/800',
    caption: 'Primeira viagem do ano! O mar está perfeito hoje. ☀️🛥️ #viagem #barco #sol',
    likes: 128,
    comments: comments,
    timestamp: '2h atrás',
  },
  {
    id: 'p2',
    user: users[1],
    imageUrl: 'https://picsum.photos/seed/p2/600/800',
    caption: 'Explorando novas ilhas com a melhor companhia. A natureza é espetacular!',
    likes: 256,
    comments: [{id: 'c3', user: users[0], text: 'Lugar maravilhoso!'}],
    timestamp: '1d atrás',
  },
];

const boats: Boat[] = [
    { id: 'b1', name: 'Estrela do Mar', imageUrl: 'https://picsum.photos/seed/b1/400/300', capacity: 150, travelTime: '2h 30m', status: 'Operando' },
    { id: 'b2', name: 'Brisa Leve', imageUrl: 'https://picsum.photos/seed/b2/400/300', capacity: 80, travelTime: '1h 45m', status: 'Operando' },
    { id: 'b3', name: 'Netuno Rei', imageUrl: 'https://picsum.photos/seed/b3/400/300', capacity: 200, travelTime: '2h 15m', status: 'Manutenção' },
];

const trips: Trip[] = [
  { id: 't1', origin: 'Salvador', destination: 'Morro de São Paulo', departureTime: '09:00', arrivalTime: '11:30', boatId: 'b1', price: 150.00, availableSeats: 45, passengers: [
    { user: users[0], ticketId: 'tk2', status: 'Pendente' },
    { user: users[3], ticketId: 'tk3', status: 'Pendente' },
    { user: users[4], ticketId: 'tk4', status: 'Pendente' },
    { user: {id: 'u7', name: 'Helena Souza', avatarUrl: 'https://picsum.photos/seed/u7/100/100'}, ticketId: 'tk12', status: 'Pendente' },
    { user: {id: 'u8', name: 'Igor Pereira', avatarUrl: 'https://picsum.photos/seed/u8/100/100'}, ticketId: 'tk13', status: 'Pendente' },
  ] },
  { id: 't2', origin: 'Salvador', destination: 'Morro de São Paulo', departureTime: '14:00', arrivalTime: '16:30', boatId: 'b1', price: 150.00, availableSeats: 12, passengers: [
    { user: users[1], ticketId: 'tk5', status: 'Pendente' },
    { user: users[5], ticketId: 'tk6', status: 'Pendente' },
  ] },
  { id: 't3', origin: 'Valença', destination: 'Morro de São Paulo', departureTime: '10:30', arrivalTime: '11:15', boatId: 'b2', price: 50.00, availableSeats: 30, passengers: [
    { user: users[2], ticketId: 'tk7', status: 'Pendente' },
  ] },
  { id: 't4', origin: 'Morro de São Paulo', destination: 'Salvador', departureTime: '11:30', arrivalTime: '14:00', boatId: 'b1', price: 150.00, availableSeats: 80, passengers: [
    { user: users[0], ticketId: 'tk1', status: 'Pendente' },
    { user: users[2], ticketId: 'tk8', status: 'Pendente' },
    { user: users[3], ticketId: 'tk9', status: 'Pendente' },
    { user: users[4], ticketId: 'tk10', status: 'Pendente' },
    { user: users[5], ticketId: 'tk11', status: 'Pendente' },
  ] },
];

const tickets: Ticket[] = [
  { id: 'tk1', trip: trips[3], purchaseDate: '2024-07-20', qrCodeData: 'EMBARQUE-TK1-T4-U1', status: 'Utilizado' },
  { id: 'tk2', trip: trips[0], purchaseDate: '2024-07-28', qrCodeData: 'EMBARQUE-TK2-T1-U1', status: 'Válido' },
];

export function useMockData() {
  return { users, posts, trips, boats, tickets };
}