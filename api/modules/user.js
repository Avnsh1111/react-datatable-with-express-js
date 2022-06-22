import User from '../models/user';
import { setUserInfo } from '../services/helpers';
const { Sequelize, Op } = require("sequelize");
//= =======================================
// User Routes
//= =======================================
import config from '../config';
export default class UserContoller {
  async postAuthViewProfileById (req)  {
    const userId = req.params.id;

    let user = await database.User.findByPk(userId);
      if(!user){
        return {
          success: false,
          data: {},
          message: 'No user could be found for this ID.' 
        };
        
      }

      const userToReturn = setUserInfo(user);

      return {
        success: true,
        data: userToReturn,
        message: "User Info"
      }

  }

  async postAuthBlockUserById (req)  {
    const blockUserId = req.params.id;

      let user = await database.User.findByPk(blockUserId);
      if(!user){
        return {
          success: false,
          data: {},
          message: 'No user could be found for this ID.' 
        };
        
      }

      let userId = req.user.id;
      
      let BlockedUser = await database.Block.findOne( { where : { userId : userId, blockUserId : blockUserId }});

      if(BlockedUser) {
        return {
          success: false,
          message: 'You already blocked this user.' 
        };
      }

      let blockedUserId = user.id;

      const blockData = {
        userId : userId,
        blockUserId : blockedUserId
      };

      let data = await database.Block.create(blockData);

      return {
        success: true,
        message: "User blocked successfully."
      }

  }

  
  async postBlockedUsers (req)  {

    //  database.Block.belongsTo(database.User, {foreignKey: 'user_id',as: 'user'});

    //  database.Block.belongsTo(database.User, {
    //       foreignKey: 'block_user_id',
    //       as: 'blockUser',
    //  });

    //  database.Block.belongsTo(database.User, {
    //     through: database.User,
    //     as: 'UserMain',  // <--- unique alias name
    //     foreignKey: 'user_id',
    //   });

    //   database.Block.belongsTo(database.User, {
    //       through: database.User,
    //       as: 'BlockUser', // <--- unique alias name
    //       foreignKey: 'block_user_id',
    //   });

      //let data = await database.Block.findAll({ include: [database.User]});

      const [data, metadata] = await database.sequelizer.query(" SELECT b.*,u.first_name,u.last_name,u.email,u.country,bu.first_name as b_first_name,bu.last_name as b_last_name,bu.email as b_email,bu.country as b_country from users_blocks b INNER JOIN users u on u.id = b.user_id INNER JOIN users bu on bu.id=b.block_user_id");
    console.log(data);
    console.log(metadata);

      return {
        success: true,
        data : data,
        message: "User blocked list."
      }

  }

  returnError(message){
      return {
        success: false,
        data: {},
        message: message
      };
    }

}