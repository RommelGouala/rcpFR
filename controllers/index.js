
const uuid = require('uuid')

function calculatePoints(receipt) {
    let points = 0;
    // Calculate points for retailer name
    points += receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;
    // Calculate points for round dollar amount
    if (Number.isInteger(parseFloat(receipt.total))) {
        points += 50;
    }
    // Calculate points for multiple of 0.25
    if (parseFloat(receipt.total) % 0.25 === 0) {
        points += 25;
    }
    // Calculate points for number of items
    points += Math.floor(receipt.items.length / 2) * 5;
    // Calculate points for item descriptions
    receipt.items.forEach(item => {
        if (item.shortDescription.trim().length % 3 === 0) {
            points += Math.ceil(parseFloat(item.price) * 0.2);
        }
    });
    // Calculate points for purchase day
    const purchaseDate = new Date(receipt.purchaseDate);
    if (purchaseDate.getDate() % 2 !== 0) {
        points += 6;
    }
    // Calculate points for purchase time
    const purchaseTime = new Date(`1970-01-01T${receipt.purchaseTime}:00.000Z`);
    if (purchaseTime.getHours() > 14 && purchaseTime.getHours() < 16) {
        points += 10;
    }
    return points;
}

function uuidv4() {
    return uuid.v4();
}


module.exports = {
    calculatePoints,
    uuidv4
}