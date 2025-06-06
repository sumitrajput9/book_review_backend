import { Review } from '../models/review.model';

export const addReview = async (userId: string, bookId: string, data: any) => {
  return await Review.create({ ...data, user: userId, book: bookId });
};

export const updateReview = async (reviewId: string, userId: string, data: any) => {
  return await Review.findOneAndUpdate({ _id: reviewId, user: userId }, data, { new: true });
};

export const deleteReview = async (reviewId: string, userId: string) => {
  return await Review.findOneAndDelete({ _id: reviewId, user: userId });
};
