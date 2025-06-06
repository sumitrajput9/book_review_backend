import { Book } from '../models/book.model';
import { Review } from '../models/review.model';

export const addBook = async (data: any) => {
  return await Book.create(data);
};

export const getBooks = async (filter: any, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const query: any = {};
  if (filter.author) query.author = new RegExp(filter.author, 'i');
  if (filter.genre) query.genre = new RegExp(filter.genre, 'i');
  return await Book.find(query).skip(skip).limit(limit);
};

export const getBookDetails = async (id: string, page = 1, limit = 5) => {
  const book = await Book.findById(id);
  const skip = (page - 1) * limit;
  const reviews = await Review.find({ book: id })
    .populate('user', 'name')
    .skip(skip)
    .limit(limit);
  const average = await Review.aggregate([
    { $match: { book: book!._id } },
    { $group: { _id: '$book', avgRating: { $avg: '$rating' } } }
  ]);
  return {
    book,
    averageRating: average[0]?.avgRating || 0,
    reviews
  };
};

export const searchBooks = async (query: string) => {
  return await Book.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { author: { $regex: query, $options: 'i' } }
    ]
  });
};


export const getBooksWithReviews = async () => {
  const books = await Book.find().lean();

  const booksWithReviews = await Promise.all(
    books.map(async (book) => {
      const reviews = await Review.find({ book: book._id }).populate('user', 'name');
      return {
        ...book,
        reviews,
      };
    })
  );

  return booksWithReviews;
};