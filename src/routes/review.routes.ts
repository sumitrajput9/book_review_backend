import express from 'express';
import { postReview, putReview, removeReview } from '../controllers/review.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/',protect,postReview);
router.put('/:id', protect, putReview);
router.delete('/:id', protect, removeReview);

export default router;