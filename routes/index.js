// routes/index.js
const express = require('express');
const authRoutes = require('./auth');
const titleRoutes = require('./title');
const companyRoutes = require('./company')
const personRoutes = require('./person')
const postRoutes = require('./post')
const curationRoutes = require('./curation')
// Diğer rota dosyalarını buraya ekleyebilirsin

const router = express.Router();

// Auth rotalarını buraya ekleyelim
router.use('/auth', authRoutes);

// Diğer rotaları da buraya ekle
router.use('/companies', companyRoutes);
router.use('/titles', titleRoutes);
router.use('/people', personRoutes);
router.use('/posts', postRoutes);
router.use('/curations',curationRoutes)
// router.use('/posts', postRoutes);

module.exports = router;
