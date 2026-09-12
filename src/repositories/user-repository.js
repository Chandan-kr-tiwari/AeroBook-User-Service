const CrudRepository = require('./crud-repository');
const { User } = require('../models');

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        return await this.model.findOne({
            where: {
                email
            }
        });
    }

      async findByRole(roleId) {
        return await this.model.findAll({
            where: {
                roleId
            }
        });
    }
}

module.exports = UserRepository;