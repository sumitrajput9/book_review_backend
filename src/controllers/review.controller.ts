import { Request, Response } from 'express';
import { addReview, updateReview, deleteReview } from '../services/review.service';

export const postReview = async (req: any, res: Response) => {
  try {
    const review = await addReview(req.user.id, req.params.id, req.body);
    res.status(201).json({message:"Add Review",data:review});
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const putReview = async (req: any, res: Response) => {
  const review = await updateReview(req.params.id, req.user.id, req.body);
  res.status(200).json({message:"Update Review",data:review});
};

export const removeReview = async (req: any, res: Response) => {
  await deleteReview(req.params.id, req.user.id);
  res.status(204).send({message:"Remove review"});
};