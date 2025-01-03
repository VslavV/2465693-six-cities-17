export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type OfferReview = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: User;
}
