import Contract from "./models/contract.js";
import User from "./models/user.js";
import Request from "./models/request.js";
const data = {
    "users": [
        {
            "id": 1,
            "username": "System Admin",
            "password": "123456789",
            "role": "Admin",
            "email": "admin@example.com"
        },
        {
            "id": 2,
            "username": "Lê Văn A",
            "password": "12345678910",
            "role": "Planner",
            "email": "vinh.dang23@student.passerellesnumeriques.org"
        },
        {
            "id": 3,
            "username": "Lê Văn B",
            "password": "01230113@Abc",
            "role": "Planner",
            "email": "xuandangvinh@gmail.com"
        },
        {
            "id": 4,
            "username": "Đào Thị C",
            "password": "12345678911",
            "role": "Vendor",
            "email": "vendor@example.com"
        },
        {
            "id": 5,
            "username": "Đào Thị D",
            "password": "12345678912",
            "role": "Vendor",
            "email": "vendor1@example.com"
        },
        {
            "id": 6,
            "username": "Trịnh Văn F",
            "password": "12345678914",
            "role": "Contractor",
            "email": "a.b23@student.passerellesnumeriques.org"
        },
        {
            "id": 7,
            "username": "Trịnh Văn K",
            "password": "12345678916",
            "role": "Contractor",
            "email": "vinh.dang23@student.passerellesnumeriques.org"
        }
    ],
    "contracts": [
        {
            "id": 3,
            "supplyVendorId": 4,
            "startDate": "2023-05-01",
            "endDate": "2023-12-31",
            "contractAmount": 950
        },
        {
            "id": 4,
            "supplyVendorId": 5,
            "startDate": "2023-06-01",
            "endDate": "2023-11-30",
            "contractAmount": 770
        },
        {
            "id": 5,
            "supplyVendorId": 4,
            "startDate": "2023-07-01",
            "endDate": "2023-11-19",
            "contractAmount": 500
        }
    ],
    "requestsForWithdraw": [
        {
            "id": 1,
            "plannerUserId": 2,
            "supplyVendorId": 4,
            "quantity": 50,
            "projectContractorUserId": 6,
            "status": "Collected"
        },
        {
            "id": 3,
            "plannerUserId": 3,
            "supplyVendorId": 5,
            "quantity": 30,
            "projectContractorUserId": 6,
            "status": "Ready to Collect"
        },
        {
            "id": 3,
            "plannerUserId": 2,
            "supplyVendorId": 4,
            "quantity": 40,
            "projectContractorUserId": 6,
            "status": "Collected"
        },
        {
            "plannerUserId": 2,
            "quantity": 9,
            "status": "Collected",
            "supplyVendorId": 5,
            "projectContractorId": "7",
            "id": 4
        },
        {
            "plannerUserId": 3,
            "quantity": 12,
            "status": "Collected",
            "supplyVendorId": 5,
            "projectContractorId": "7",
            "id": 5
        },
        {
            "plannerUserId": 2,
            "quantity": 13,
            "status": "Ready to Collect",
            "supplyVendorId": 5,
            "projectContractorId": "7",
            "id": 6
        },
        {
            "plannerUserId": 3,
            "quantity": 14,
            "status": "Ready to Collect",
            "supplyVendorId": 5,
            "projectContractorId": "7",
            "id": 7
        }
    ]
};
async function seedData() {
    try {
        // Tạo các bản ghi User
        for (const userData of data.users) {
                await User.create(userData);
        }

        // Tạo các bản ghi Contract
        for (const contractData of data.contracts) {
            await Contract.create(contractData);
        }

        // Tạo các bản ghi Request
        for (const requestData of data.requestsForWithdraw) {
            await Request.create(requestData);
        }

        console.log('Dữ liệu đã được tạo thành công');
    } catch (error) {
        console.error('Đã xảy ra lỗi trong quá trình tạo dữ liệu:', error);
    }
}
seedData();