export interface ClassicVideo {
  id: string;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  thumbnail: string;
}

export const classics: ClassicVideo[] = [
  {
    id: "1",
    title: "Ta mig till Casa",
    youtubeUrl: "https://www.youtube.com/watch?v=a_EgrRkbcoI",
    youtubeId: "a_EgrRkbcoI",
    thumbnail: "https://img.youtube.com/vi/a_EgrRkbcoI/hqdefault.jpg",
  },
  {
    id: "2",
    title: "Hanken – TF 1972",
    youtubeUrl: "https://www.youtube.com/watch?v=NkyEGc8HYQs",
    youtubeId: "NkyEGc8HYQs",
    thumbnail: "https://img.youtube.com/vi/NkyEGc8HYQs/hqdefault.jpg",
  },
  {
    id: "3",
    title: "Sven Dufva",
    youtubeUrl: "https://www.youtube.com/watch?v=CbYP9VWHYe8",
    youtubeId: "CbYP9VWHYe8",
    thumbnail: "https://img.youtube.com/vi/CbYP9VWHYe8/hqdefault.jpg",
  },
];
