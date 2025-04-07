import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const seedRoles = async () => {
    const roles = [{ name: "super_admin" }, { name: "admin" }, { name: "user" }];
    for (const role of roles) {
        await prisma.role.upsert({
            where: { name: role.name },
            update: {},
            create: role,
        });
    }
    console.log("✅ Roles seeded successfully.");
};

const seedUser = async () => {
    const superAdminRole = await prisma.role.findUnique({
        where: { name: "super_admin" },
    });

    if (!superAdminRole) {
        throw new Error("super_admin role not found.");
    }

    const hash = await bcrypt.hash("password", 10);

    const user = await prisma.user.upsert({
        where: { email: "superadmin@gmail.com" },
        update: {},
        create: {
            name: "superAdmin",
            email: "superadmin@gmail.com",
            passwordHash: hash,
        },
    });

    await prisma.userRole.upsert({
        where: { userId_roleId: { userId: user.id, roleId: superAdminRole.id } },
        update: {},
        create: {
            userId: user.id,
            roleId: superAdminRole.id,
        },
    });

    console.log("✅ Super admin user seeded successfully.");
};

const main = async () => {
    await seedRoles();
    await seedUser();
};

main()
    .then(() => console.log("🌱 Seeding completed."))
    .catch((error) => {
        console.error("❌ Error seeding database:", error);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log("🔌 Disconnected from database.");
    });
