// Finding the product.......

import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/product.js';

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword ? req.query.keyword.trim() : '';

  if (keyword) {
    const searchPipeline = [
      {
        $search: {
          index: "default",
          text: {
            query: keyword,
            path: ["name", "description", "brand"],
            fuzzy: { maxEdits: 2 },
          },
        },
      },
      {
        $project: {
          name: 1,
          price: 1,
          image: 1,
          brand: 1,
          rating: 1,
          numReviews: 1,
          description: 1,
        }
      },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [
            { $skip: pageSize * (page - 1) }, 
            { $limit: pageSize }
          ],
        },
      },
    ];

    try {
      const results = await Product.aggregate(searchPipeline);
      const products = results[0].data;
      const total = results[0].metadata[0] ? results[0].metadata[0].total : 0;
      
      res.json({ products, page, pages: Math.ceil(total / pageSize) });
    } catch (error) {
      console.error("Search Error:", error);
      res.status(500).json({ message: "Search failed" });
    }

  } else {
    const count = await Product.countDocuments({});
    const products = await Product.find({})
      .select('-reviews') 
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export {
  getProducts,
  getProductById,
};