const Admin = require("../models/Admin");

const createAdmins = async () => {

    const admins = [
        {
            name: "Jaywant",
            email: "jaywant@campuscare.com",
            password: "admin_2408054"
        },
        {
            name: "Sakshi",
            email: "sakshi@campuscare.com",
            password: "sakshi_0224"
        }
    ];

    for (const admin of admins) {

        const existingAdmin = await Admin.findOne({
            where: {
                email: admin.email
            }
        });

        if (!existingAdmin) {
            await Admin.create(admin);
            console.log(`Admin created: ${admin.email}`);
        }
    }

    console.log("Admin setup completed");
};

module.exports = createAdmins;
