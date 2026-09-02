import {
  createOrganizationSchema,
  addMemberSchema,
} from "./organization.validation.js";
import {
  createOrganization,
  getOrganization,
  getOrganizationMembers,
  addOrganizationMember,
} from "./organization.service.js";
export async function getMembersController(req, res) {
  try {
    const members = await getOrganizationMembers(
      String(req.params.organizationId),
    );
    return res.json({
      success: true,
      data: {
        members,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch members",
    });
  }
}
export async function addMemberController(req, res) {
  try {
    const data = addMemberSchema.parse(req.body);
    const member = await addOrganizationMember(
      String(req.params.organizationId),
      data.email,
      data.role,
    );
    return res.status(201).json({
      success: true,
      message: "Member added successfully",
      data: {
        member,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "No user exists with this email",
      });
    }
    if (error instanceof Error && error.message === "MEMBER_ALREADY_EXISTS") {
      return res.status(409).json({
        success: false,
        message: "User is already a member",
      });
    }
    return res.status(400).json({
      success: false,
      message: "Unable to add member",
    });
  }
}
export async function createOrganizationController(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }
    const data = createOrganizationSchema.parse(req.body);
    const organization = await createOrganization(req.userId, data.name);
    return res.status(201).json({
      success: true,
      message: "Organization created successfully",
      data: {
        organization,
      },
    });
  } catch (error) {
    // console.error(error);
    return res.status(400).json({
      success: false,
      message: "Unable to create organization",
    });
  }
}
export async function getOrganizationController(req, res) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "authentication required",
      });
    }
    const organization = await getOrganization(
      req.userId,
      String(req.params.organizationId),
    );
    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found",
      });
    }
    return res.json({
      success: true,
      data: {
        organization,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch organization",
    });
  }
}
