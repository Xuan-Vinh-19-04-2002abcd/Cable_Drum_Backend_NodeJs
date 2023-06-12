import {getAllContracts,getAllContractsBySuppervendorId} from "../service/ContractService.js";
async function getAllContractsController(req, res) {
    try {
        const contracts = await getAllContracts();
        return res.status(200).json(contracts);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
async function getAllContractsBySuppervendorIdController(req, res) {
    const { suppervendorId } = req.body;

    try {
        const contracts = await getAllContractsBySuppervendorId(suppervendorId);
        res.json(contracts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {getAllContractsController,getAllContractsBySuppervendorIdController}