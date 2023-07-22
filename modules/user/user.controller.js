const {User} = require("../../models")
const { errorResponse, successResponse } = require("../../utils/responses")
const bcrypt = require("bcrypt")


const registerUser = async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        password,
        type
      } = req.body;
     
      const user = await User.findOne({ where: { email } });
  
      if (user) {
        res.status(403).json({
          status: false,
          message: "Email is already registered"
        });
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({
          name,
          type,
          phone,
          email,
          password: hashedPassword
        });  

        const response = await User.findOne({
          where: {
            email: email
          }
        });
       successResponse(res,response)
      }
    } catch (error) {
      errorResponse(res,error)
    }
  };
 


  const updateUser = async(req,res)=>{
    try {
      let {
        name,
        email,
        phone,
        password,
        type
      } = req.body;
      const uuid = req.params.uuid
      if(password.length < 15){
        const hashedPassword = bcrypt.hashSync(password, 10);
        password = hashedPassword;
      }
    const user = await User.findOne({
            where:{
                uuid
            }
        })
        if(req.file){
            const { originalname } = req.file;
             image = production_endpoint + originalname;
        }
        const response = await user.update({
          name,
          email,
          phone,
          password,
          type
        })
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

const deleteUser = async(req,res)=>{
    try {     
        const uuid = req.params.uuid
        const user = await User.findOne({
            where:{
                uuid
            }
        })
        const response =  await user.destroy()
        successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
}

  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(404).json({
          status: false,
          message: "User does not exist"
        });
      } else {
        if (await bcrypt.compare(password, user.password)) {
          const response = await User.findOne({
            where: {
              email: email
            }
          });
          successResponse(res,response)

        } else {
          res.status(403).json({
            status: false,
            message: "Wrong password"
          });
        }
      }
    } catch (error) {
      errorResponse(res,error)
    }
  };

  const getStaffs = async (req, res) => {
    try {
      const response = await User.findAll({ where: { type:"Staff" } });
      successResponse(res,response)
    } catch (error) {
        errorResponse(res,error) 
    }
  };

  const getUsers = async (req, res) => {
    try {
      const response = await User.findAll();
      successResponse(res,response)
    } catch (error) {
        errorResponse(res,error) 
    }
  };
  const getAdmins = async (req, res) => {
    try {
      const response = await User.findAll({ where: { type:"Admin" } });
      successResponse(res,response)
    } catch (error) {
        errorResponse(res,error)
    }
  };

 module.exports = {registerUser,loginUser,updateUser,getStaffs,getAdmins,deleteUser,getUsers}