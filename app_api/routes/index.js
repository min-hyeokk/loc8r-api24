import express from 'express';
const router = express.Router();
import { expressjwt as jwt } from 'express-jwt';
const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'req.auth'
});
import * as ctrlLocations from '../controllers/locations.js';
import * as ctrlReviews from '../controllers/reviews.js';
import * as ctrlAuth from '../controllers/authentication.js';
//locations
router
  .route('/locations')
  .get(ctrlLocations.locationsListByDistance)
  .post(ctrlLocations.locationsCreate);
router
  .route('/locations/:locationid')
  .get(ctrlLocations.locationsReadOne)
  .put(ctrlLocations.locationsUpdateOne)
  .delete(ctrlLocations.locationsDeleteOne);

//reviews
router
  .route('/locations/:locationid/reviews')
  .post(auth, ctrlReviews.reviewsCreate);
router
  .route('/locations/:locationid/reviews/:reviewid')
  .get(ctrlReviews.reviewsReadOne)
  .put(auth, ctrlReviews.reviewsUpdateOne)
  .delete(auth, ctrlReviews.reviewsDeleteOne);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

export default router;