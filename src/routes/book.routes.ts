import express from 'express';
import { upload } from '../config/multer';
import { createBook, fetchBooks, fetchBookDetails, search, fetchBooksWithReviews } from '../controllers/book.controller';
import { postReview } from '../controllers/review.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', fetchBooks);
router.get('/search', search);
router.get('/with-reviews', fetchBooksWithReviews);
router.get('/:id', fetchBookDetails);
router.post('/', protect, upload.single('image'), createBook);
router.post('/:id/reviews', protect, postReview);

export default router;
