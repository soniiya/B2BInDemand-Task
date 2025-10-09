import mongoose from "mongoose";
import { connectDB } from "./dbConfig.js";

import { Permission } from "./models/Permissions.js";
import { Role } from "./models/RoleSchema.js";
import { User } from "./models/UserModel.js";
import { Organization } from "./models/OrganizationModel.js";
import { Lead } from "./models/LeadModel.js";
import { Project } from "./models/ProjectModel.js";
import { Task } from "./models/TaskModel.js";
import {
  allPermissions,
  rolesData,
  demoUsers,
  DEMO_PASSWORD,
} from "./utils/seeData.js";
import bcrypt from "bcrypt";


async function main() {
  try {
    await connectDB()
    console.log("Database connected. Starting seed...");

    await seedRBAC(); 

    console.log("Seeding complete.");
  } catch (error: any) {
    console.error("Critical Seeding Failure:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

async function seedRBAC() {
  await Promise.all([
    Permission.deleteMany({}),
    Role.deleteMany({}),
    User.deleteMany({}),
  ]);
  console.log("Cleared old RBAC and user data.");

  const permissionDocs = allPermissions.map((name) => ({ name }));
  const seededPermissions = await Permission.insertMany(permissionDocs);
  console.log(
    `[SEED DIAGNOSTIC] Seeded ${seededPermissions.length} permissions.`
  ); // 👈 Check this!

  const permissionMap = new Map(seededPermissions.map((p) => [p.name, p._id]));

  const acmeOrg = await Organization.create({ name: "Acme Corp", domain: 'acme.test' });
  console.log(`Created Org: ${acmeOrg.name}`);

  const seededRoles = [];
  console.log(
    `[SEED DIAGNOSTIC] Attempting to seed ${seededRoles.length} roles.`
  ); // 👈 Check this!

  for (const roleDef of rolesData) {
    const permissionIds = roleDef.permissions
      .map((pName) => permissionMap.get(pName))
      .filter(Boolean);

    const role = await Role.create({
      name: roleDef.name,
      permissions: permissionIds,
      is_admin: roleDef.is_admin,
    });
    seededRoles.push(role);
  }
  const roleMap = new Map(seededRoles.map((r) => [r.name, r._id]));
  console.log("Seeded Roles and Permissions.");

  // 4. Seed Users
  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);
  const userPromises = demoUsers
    .map((user) => {
      const roleId = roleMap.get(user.roleName);

      if (!roleId) {
        console.error(`Role ID not found for ${user.roleName}`);
        return null;
      }

      return User.create({
        name: user.roleName,
        email: user.email,
        passwordHash: hashedPassword,
        org_id: acmeOrg._id,
        role_id: roleId,
      });
    })
    .filter(Boolean);

  await Promise.all(userPromises);
  console.log(`Seeded ${userPromises.length} demo users.`);

  console.log("Seeding complete.");
}

main()

// async function seedRoles() {
//     await connectDB();

//     try {
//         console.log('Starting role seeding...');
//         const result = await Role.insertMany(rolesData, { ordered: false });

//         console.log(`Successfully seeded ${result.length} roles.`);

//     } catch (error: any) {
//         if (error.code === 11000) {
//              console.log("Roles already exist in the database. Seeding skipped.");
//         } else {
//              console.error("Error during role seeding:", error);
//         }
//     } finally {
//         mongoose.connection.close();
//     }
// }

// seedRoles();
