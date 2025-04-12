/**
 * @swagger
 * tags:
 *   - name: Search
 *     description: API for searching products based on various parameters
 */

/**
 * @swagger
 * /api/search/{paramsKey}:
 *   get:
 *     tags:
 *       - Search
 *     summary: Search for products based on query parameters
 *     description: This endpoint allows searching for products by various parameters like Articul, RetailPrice, ModelName, and more. Results are paginated.
 *     parameters:
 *       - in: path
 *         name: paramsKey
 *         required: true
 *         schema:
 *           type: string
 *         description: The key for the product parameters (e.g., paramsFrom_01_MebliBalta).
 *       - in: query
 *         name: info
 *         required: true
 *         schema:
 *           type: string
 *         description: Search term for finding products (can be a product name, articul, price, etc.)
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page.
 *       - in: query
 *         name: sortField
 *         required: false
 *         schema:
 *           type: string
 *           default: 'RetailPrice'
 *         description: Field by which to sort products.
 *       - in: query
 *         name: sortOrder
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: 'asc'
 *         description: Sorting order (ascending or descending).
 *       - in: query
 *         name: minPrice
 *         required: false
 *         schema:
 *           type: number
 *         description: Minimum price for filtering products.
 *       - in: query
 *         name: maxPrice
 *         required: false
 *         schema:
 *           type: number
 *         description: Maximum price for filtering products.
 *     responses:
 *       200:
 *         description: A list of matching products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSearch:
 *                   type: integer
 *                   description: Total number of search results.
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages.
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number.
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request (missing or invalid query parameters).
 *       404:
 *         description: No products found matching the search criteria.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the product.
 *         name:
 *           type: string
 *           description: Name of the product.
 *         RetailPrice:
 *           type: number
 *           description: Price of the product.
 *         description:
 *           type: string
 *           description: Short description of the product.
 *         offerId:
 *           type: string
 *           description: Offer ID of the product.
 *         ModelName:
 *           type: string
 *           description: Model name of the product.
 *         Articul:
 *           type: string
 *           description: Article number of the product.
 *         categoryId:
 *           type: string
 *           description: Category ID of the product.
 *         availability:
 *           type: object
 *           description: Availability details across different locations.
 *         paramsFrom_01_MebliBalta:
 *           type: object
 *           description: Parameters for a specific location (e.g., MebliBalta).
 *         paramsFrom_02_MebliPodilsk:
 *           type: object
 *           description: Parameters for a specific location (e.g., MebliPodilsk).
 *         paramsFrom_03_MebliPervomaisk:
 *           type: object
 *           description: Parameters for a specific location (e.g., MebliPervomaisk).
 *         paramsFrom_04_MebliOdesa1:
 *           type: object
 *           description: Parameters for a specific location (e.g., MebliOdesa1).
 *         paramsFrom_05_MebliVoznesensk:
 *           type: object
 *           description: Parameters for a specific location (e.g., MebliVoznesensk).
 */
