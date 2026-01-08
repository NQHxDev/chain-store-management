import rateLimit from 'express-rate-limit';

import { OverLimitError } from '../appError.ts';

class RateLimit {
   static accessRateLimiter = rateLimit({
      windowMs: 60 * 1000,
      limit: 5,
      standardHeaders: 'draft-8',
      skipSuccessfulRequests: true,
      handler: (req, res, next) => {
         const error = new OverLimitError('Quá nhiều lần thử! Vui lòng thử lại sau 1 phút');
         next(error);
      },
   });
}

export default RateLimit;
