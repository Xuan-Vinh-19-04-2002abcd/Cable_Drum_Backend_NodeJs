import Request from "../models/request.js";
import User from "../models/user.js";
import Contract from "../models/contract.js";

async function createRequest(vendorUsername, plannerUsername, contractorUsername, quantity) {
    try {
        const vendor = await User.findOne({ username: vendorUsername });
        const planner = await User.findOne({ username: plannerUsername });
        const contractor = await User.findOne({ username: contractorUsername });
        if (!vendor || !planner || !contractor) {
            throw new Error("User does not exist");
        }

        const newRequest = new Request({
            supperVendorId: vendor._id,
            phannerUserId: planner._id,
            projectContractorUserId: contractor._id,
            quantity,
            status: "New",
        });


        await newRequest.save();

        return newRequest;
    } catch (error) {
        throw new Error(`Request fail: ${error.message}`);
    }
}
async function getAllRequests(supperVendorId) {
    try {
        const requests = await Request.find({ supperVendorId }).exec();

        const formattedRequests = await Promise.all(
            requests.map(async (request) => {
                const { phannerUserId, projectContractorUserId, ...rest } = request.toObject();

                const plannerUser = await User.findById(phannerUserId).exec();
                const contractorUser = await User.findById(projectContractorUserId).exec();

                const plannerUsername = plannerUser ? plannerUser.username : undefined;
                const contractorUsername = contractorUser ? contractorUser.username : undefined;

                return {
                    ...rest,
                    plannerUsername,
                    contractorUsername,
                };
            })
        );

        return formattedRequests;
    } catch (error) {
        throw new Error(`Lỗi khi lấy danh sách yêu cầu: ${error.message}`);
    }
}
async function getAllRequestsContractor(projectContractorUserId) {
    try {
        const requests = await Request.find({ projectContractorUserId }).exec();

        const formattedRequests = await Promise.all(
            requests.map(async (request) => {
                const { phannerUserId, supperVendorId, ...rest } = request.toObject();

                const plannerUser = await User.findById(phannerUserId).exec();
                const vendorUser = await User.findById(supperVendorId).exec();

                const plannerUsername = plannerUser && plannerUser.username;
                const vendorUsername = vendorUser && vendorUser.username;

                return {
                    ...rest,
                    plannerUsername,
                    vendorUsername,
                };
            })
        );

        return formattedRequests;
    } catch (error) {
        throw new Error(`Get contractor request fail: ${error.message}`);
    }
}

async function updateContractByVendorId(supperVendorId,quantity) {
    try {
        const updatedContract = await Contract.findOneAndUpdate(
            { suppervendorId: supperVendorId },
            {
                status: "Collected",
                $inc: { contractAmount: -quantity }
            },
            { new: true }
        ).exec();

        if (!updatedContract) {
            throw new Error("Contract not found");
        }

        return updatedContract;
    } catch (error) {
        throw new Error(`Failed to update contract: ${error.message}`);
    }
}

async function updateRequestStatus(requestId, status) {
    try {
        const updatedRequest = await Request.findByIdAndUpdate(
            requestId,
            { status },
            { new: true }
        ).exec();

        if (!updatedRequest) {
            throw new Error("Request not found");
        }

        const { projectContractorUserId,phannerUserId, supperVendorId, ...rest } = updatedRequest.toObject();

        const plannerUser = await User.findById(phannerUserId).exec();
        const vendorUser = await User.findById(supperVendorId).exec();
        const projectUsername = await User.findById(projectContractorUserId).exec();
        const plannerUsername = plannerUser && plannerUser.username;
        const vendorUsername = vendorUser && vendorUser.username;
        const contractorUsername = projectUsername && projectUsername.username;


        const formattedRequest = {
            ...rest,
            plannerUsername,
            vendorUsername,
            contractorUsername
        };

        if (status === "Collected") {
            await updateContractByVendorId(
                updatedRequest.supperVendorId,
                updatedRequest.quantity
            );
        }

        return formattedRequest;
    } catch (error) {
        throw new Error(`Failed to update request status: ${error.message}`);
    }
}



export {createRequest,getAllRequests,getAllRequestsContractor,updateRequestStatus}
