// controllers/trackingMapController.js
const TrackingMap = require('../Model/TrackingMap_Model');

// Example: In-memory storage for tracking maps
const trackingMaps = [];

exports.createTrackingMap = (req, res) => {
    if (!req.body) {
        res.status(400).send("Content Cannot Be Empty");
        return;
    }

    // Create a tracking object using req.body properties
    const tracking = new TrackingMap({
        accessToken: req.body.accessToken,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    });

    // Push the tracking object to your trackingMaps array
    trackingMaps.push(tracking);

    res.status(201).json({
        success: true,
        accessToken: tracking.accessToken,
        latitude: tracking.latitude,
        longitude: tracking.longitude,
    });
};



