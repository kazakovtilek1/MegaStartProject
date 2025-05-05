export interface Tour {
  id: number;
  title: string;
  tourDuration: number;
  rating: number;
  price: number;
  departureDate: string;
  placesLeft: number;
  image: string;
}

export const tours: Tour[] = [
  {
    id: 1,
    title: "Жети Огуз",
    tourDuration: 3,
    rating: 4.8,
    price: 5000,
    departureDate: "18.03, 20.03",
    placesLeft: 6,
    image: "/images/zhetiOguz.png",
  },
  {
    id: 2,
    title: "Ара Кол",
    tourDuration: 1,
    rating: 4.6,
    price: 1500,
    departureDate: "18.03, 20.03",
    placesLeft: 3,
    image: "/images/araKol.png",
  },
  {
    id: 3,
    title: "Каньон Сказка",
    tourDuration: 1,
    rating: 5.0,
    price: 2000,
    departureDate: "18.03, 20.03",
    placesLeft: 5,
    image: "/images/canyonSkazka.png",
  },
  {
    id: 4,
    title: "Каньон Сказка",
    tourDuration: 7,
    rating: 5.0,
    price: 2000,
    departureDate: "18.03, 20.03",
    placesLeft: 5,
    image: "/images/canyonSkazka.png",
  },
  {
    id: 5,
    title: "Каньон Сказка",
    tourDuration: 101,
    rating: 5.0,
    price: 2000,
    departureDate: "18.03, 20.03",
    placesLeft: 5,
    image: "/images/canyonSkazka.png",
  },
  {
    id: 6,
    title: "Каньон Сказка",
    tourDuration: 234,
    rating: 5.0,
    price: 2000,
    departureDate: "18.03, 20.03",
    placesLeft: 5,
    image: "/images/canyonSkazka.png",
  },
];
