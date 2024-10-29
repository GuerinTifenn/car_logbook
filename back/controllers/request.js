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

    // Respond with the list of requests
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ error: error.message });
  }
};

// accept or decline edit by admin //
exports.processEditRequest = async (req, res) => {
  try {
    const { requestId, action } = req.params;

    const request = await Request.findById(requestId);
    if (!request) return res.status(404).json({ success: false, message: "Request not found" });

    const service = await Service.findById(request.service._id);
    if (!service) return res.status(404).json({ success: false, message: "Service not found" });

    if (action === "accept") {
      // Apply the updates if accepted
      service.interventionDate = request.interventionDate;
      service.description = request.description;
      service.kilometers = request.kilometers;
      service.price = request.price;
      service.comment = request.comment;
      service.status = "accepted";

      request.status = "accepted";
      await Promise.all([service.save(), request.save()]); // Save both changes concurrently


    } else if (action === "decline") {
      request.status = "declined";
      service.status = "declined";
      await Promise.all([service.save(), request.save()]);

    } else {
      return res.status(400).json({ success: false, message: "Invalid action" });
    }

    await Request.findByIdAndDelete(requestId); // Remove request after processing

    res.status(200).json({
      success: true,
      message: `Request ${action === "accept" ? "accepted" : "declined"} successfully.`,
    });

  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// accept or decline delete by admin //
exports.processDeleteRequest = async (req, res) => {
  try {
    const { requestId, action } = req.params;

    const request = await Request.findById(requestId);
    if (!request) return res.status(404).json({ success: false, message: "Request not found" });

    const service = await Service.findById(request.service._id);
    if (!service) return res.status(404).json({ success: false, message: "Service not found" });

    if (action === "accept") {
      await Promise.all([
        Service.findByIdAndDelete(service._id),
        Request.findByIdAndDelete(request._id),
      ]);
      return res.status(200).json({
        success: true,
        message: "Delete request accepted, service deleted successfully.",
      });


    } else if (action === "decline") {
      service.status = "declined";
      await Promise.all([
        service.save(),
        Request.findByIdAndDelete(request._id),
      ]);
      return res.status(200).json({
        success: true,
        message: "Delete request declined successfully.",
      });

    } else {
      return res.status(400).json({ success: false, message: "Invalid action" });
    }

  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

//delete request
exports.submitDeleteServiceRequest = async (req, res) => {
  try {
    const { comment } = req.body;
    const userId = req.auth.userId
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const serviceId = req.body.serviceId;

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

    // Create the request object for a delete request
    const request = new Request({
      comment,
      service: serviceId,
      type: "delete",
      userId,
      status: "pending",
      fileName: fileUrl
    });

    // Save the delete request
    const savedRequest = await request.save();
    return res.status(201).json({ message: "Delete request submitted successfully!", request: savedRequest });

  } catch (error) {
    console.error("Error submitting delete service request:", error);
    res.status(500).json({ error: error.message });
  }
};
