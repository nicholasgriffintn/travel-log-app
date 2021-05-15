const { Router } = require('express');
const RateLimit = require('express-rate-limit');

const router = Router();

const rateLimitDelay = 10 * 1000; // 10 second delay
const limiter = new RateLimit({
  max: 1,
  windowMs: rateLimitDelay,
});

const logs = require('../models/logs');

router.get('/:id', async (req, res, next) => {
  try {
    const entries = await logs.get({ id: req.params.id });
    res.status(200).json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', limiter, async (req, res, next) => {
  try {
    if (req.get('X-API-KEY') !== process.env.API_KEY) {
      res.status(401);
      throw new Error('UnAuthorized');
    }

    const body = req.body;

    const logEntry = await log.create({
      userID: body.userID,
      title: body.title,
      description: body.description,
      comments: body.comments,
      slug: body.slug,
      images: body.images,
      rating: body.rating,
      latitude: body.latitude,
      longitude: body.longitude,
      publishedAt: body.publishedAt,
      status: body.status,
    });

    res.status(200).json(logEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

module.exports = router;
