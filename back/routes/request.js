const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config"); // Import du middleware Multer
const requestController = require("../controllers/request");
// Routes pour les requêtes admin edit / delete

router.post("/service/edit/request", auth, multer, requestController.submitEditServiceRequest);
router.post("/service/delete/request", auth, multer, requestController.submitDeleteServiceRequest);
router.get("/admin/requests", auth, requestController.getAllRequests);
router.patch("/admin/requests/edit/process/:requestId/:action", auth, requestController.processEditRequest);

module.exports = router;
