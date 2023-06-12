import {createRequest, getAllRequests, getAllRequestsContractor,updateRequestStatus} from "../service/RequestService.js";
async function createRequestController(req, res) {
    const { vendorUsername, plannerUsername, contractorUsername, quantity } = req.body

    try {
        const newRequest = await createRequest(vendorUsername, plannerUsername, contractorUsername, quantity);
        return res.status(200).json({ success: true, request: newRequest });
    } catch (error) {
        return res.status(500).json({ error: `Request Fail: ${error.message}` });
    }
}
async function getAllRequestsController(req, res) {
    const { supperVendorId } = req.body;

    try {
        const requests = await getAllRequests(supperVendorId);

        return res.status(200).json(requests);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
async function getAllRequestsContractorController(req, res) {
    const { projectContractorUserId } = req.body;

    try {
        const requests = await getAllRequestsContractor(projectContractorUserId);

        return res.status(200).json(requests);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
async function updateStatus(req, res) {
    const { requestId, status } = req.body;

    try {
        const updatedRequest = await updateRequestStatus(requestId, status);
        return res.status(200).json(updatedRequest);
    } catch (error) {
        return res.status(500).json({ error: `Failed to update request status: ${error.message}` });
    }
}

export {createRequestController,getAllRequestsController,getAllRequestsContractorController,updateStatus};