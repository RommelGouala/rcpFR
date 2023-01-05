const router = require('express').Router()
const receipts = {}
const pointsByReceiptId = {}
// import the controllers
const { calculatePoints, uuidv4 } = require('../controllers/index')


//start router
//Landing page

router.get('/', (req, res) => {
    res.send("Home Page Test")
})


//Post
router.post('/process', (req, res) => {
    // Generate an ID for the receipt
    const id = uuidv4();
    // Save the receipt to memory
    receipts[id] = req.body;
    // Calculate the points for the receipt
    const points = calculatePoints(req.body);
    // Save the points to memory
    pointsByReceiptId[id] = points;
    // Return the ID to the client
    res.json({ id });
});


router.get('/:id/points', (req, res) => {
    const id = req.params.id;
    const points = pointsByReceiptId[id];
    if (points) {
        res.json({ points });
    } else {
        res.status(404).json({ error: 'Receipt not found' });
    }
});


//export router
module.exports = router