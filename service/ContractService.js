import Contract from "../models/contract.js";
import User from "../models/user.js";
async function getAllContracts() {
    try {
        const contracts = await Contract.find();
        const contractsWithUsernames = await Promise.all(
            contracts.map(async (contract) => {
                const user = await User.findById(contract.suppervendorId);
                const username = user ? user.username : 'Unknown'; // Nếu không tìm thấy user, sử dụng giá trị mặc định
                return { ...contract.toObject(), username };
            })
        );
        return contractsWithUsernames;
    } catch (error) {
        throw new Error(`Error Contract: ${error.message}`);
    }
}
async function getAllContractsBySuppervendorId(suppervendorId) {
    try {
        const contracts = await Contract.find({ suppervendorId: suppervendorId })
            .populate('suppervendorId', 'username');

        const contractsWithUsernames = contracts.map(contract => ({
            ...contract.toObject(),
            username: contract.suppervendorId.username
        }));

        return contractsWithUsernames;
    } catch (error) {
        throw new Error(`Error retrieving contracts: ${error.message}`);
    }
}

export {getAllContracts,getAllContractsBySuppervendorId}