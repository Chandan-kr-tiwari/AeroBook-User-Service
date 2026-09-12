const RoleRepository = require('../repositories');

const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

class RoleService {
    constructor() {
        this.roleRepository = new RoleRepository();
    }

    async getRole(id) {
        try {
            return await this.roleRepository.get(id);

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError(
                'Cannot fetch role',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getAllRoles() {
        try {
            return await this.roleRepository.getAll();

        } catch (error) {
            throw new AppError(
                'Cannot fetch roles',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    async findRoleByDescription(description) {
        try {
            const role =
                await this.roleRepository.findByDescription(description);

            if (!role) {
                throw new AppError(
                    'Role not found',
                    StatusCodes.NOT_FOUND
                );
            }

            return role;

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError(
                'Cannot find role',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

module.exports = RoleService;