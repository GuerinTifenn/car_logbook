const Service = require("../models/service");
const Request = require("../models/request");

exports.submitEditServiceRequest = async (req, res) => {
  try {
    const { interventionDate, description, kilometers, price, comment } = req.body;
    const serviceId = req.body.serviceId; // The service the request is related to
    const userId = req.auth.userId
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    // Ensure the service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    service.status = "pending";
    await service.save(); // Save the updated service with the new status

    // Check if a request for the same service already exists and is still pending
    const existingRequest = await Request.findOne({ service: serviceId, status: "pending" });

    if (existingRequest) {
      // Delete the existing request (if you want to replace it)
      await Request.findByIdAndDelete(existingRequest._id);
    }

    // Create the request object
    const request = new Request({
      interventionDate,
      description,
      kilometers,
      price,
      comment,
      type: "edit",
      userId,
      service: serviceId, // Link the request to the service
      status: "pending", // Set initial status to pending for admin review
      fileName: fileUrl
    });

    // Save the request
    const savedRequest = await request.save();

    // Send a success response
    res.status(201).json({
      message: "Service request submitted successfully!",
      request: savedRequest,
    });
  } catch (error) {
    console.error("Error submitting service request:", error);
    res.status(500).json({ error: error.message });
  }
}

// Récupération de tous les services
exports.getAllRequests = async (req, res) => {
  try {
    // Fetch all requests from the Request collection
    const requests = await Request.find()
      .populate("service") // Optionally populate the related service
      .populate("userId");  // Optionally populate user details if needed

    // Respond with the list of requests
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: error.message });
  }
};

//delete request

// exports.submitDeleteServiceRequest = async (req, res) => {
//   try {
//     const { comments } = req.body;
//     const serviceId = req.body.serviceId;

//     // Ensure the service exists
//     const service = await Service.findById(serviceId);
//     if (!service) {
//       return res.status(404).json({ message: "Service not found" });
//     }

//     // Create the request object for a delete request
//     const request = new Request({
//       comments,
//       service: serviceId,
//       type: "delete",
//       status: "pending",
//     });

//     // Save the delete request
//     const savedRequest = await request.save();
//     return res.status(201).json({ message: "Delete request submitted successfully!", request: savedRequest });

//   } catch (error) {
//     console.error("Error submitting delete service request:", error);
//     res.status(500).json({ error: error.message });
//   }
// };
