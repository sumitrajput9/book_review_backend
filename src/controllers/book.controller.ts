import { Request, Response } from 'express';
import { addBook, getBooks, getBookDetails, searchBooks, getBooksWithReviews } from '../services/book.service';

export const createBook = async (req: Request & { user?: any }, res: Response) => {
  try {
    const filename = req.file?.filename;
    const imageUrl = filename ? `${req.protocol}://${req.get('host')}/uploads/${filename}` : null;

    const book = await addBook({
      ...req.body,
      image: imageUrl,
      createdBy: req.user.id
    });

    res.status(201).json({message:"Book created by user",data:book});
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const fetchBooks = async (req: Request, res: Response) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const books = await getBooks({ author, genre }, Number(page), Number(limit));
  res.status(200).json({message:"Retrieve all books",data:books});
};

export const fetchBookDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { page = 1, limit = 5 } = req.query;
  const details = await getBookDetails(id, Number(page), Number(limit));
  res.status(200).json({message:"Retreive Books",data:details});
};

export const search = async (req: Request, res: Response) => {
  const { q } = req.query;
  const result = await searchBooks(String(q));
  res.status(200).json({message:"Retrieve books",data:result});
};

export const fetchBooksWithReviews = async (req: Request, res: Response) => {
  try {
    const data = await getBooksWithReviews();
    res.status(200).json({
      success: true,
      message: 'Fetched all books with reviews',
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};