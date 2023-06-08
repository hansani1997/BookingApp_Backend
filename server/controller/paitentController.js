import multer from "multer";
import paitentModel from "./model/paitentModel";


export const getAllPaitent = async (req, res, next) => {
    let users;
    try {
      users = await Usermodel.find();
    } catch (err) {
      console.log(err);
    }
    if (!users) {
      return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json({ users });
  };

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // specify the destination folder where the images will be saved
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const fileExtension = file.originalname.split('.').pop();
      cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
    },
  });
  
  const upload = multer({ storage });

  //signup
  export const signup = async (req, res, next) => {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Image upload failed' });
      }
  
      const { firstName, lastNname,phoneNumber, email, password } = req.body;
      const image = req.file; // The uploaded image file object
  
      let existingUser;
      try {
        existingUser = await paitentModel.findOne({ email });
      } catch (err) {
        return console.log(err);
      }
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User Already Exists! Login Instead" });
    }

    //password hashing
    const hashedPassword = bcrypt.hashSync(password);
  
    const user = new Usermodel({
      firstName,
      lastNname,
      phoneNumber,
      email,
      password:hashedPassword,
    });
  
    try {
      await user.save();
    } catch (err) {
      return console.log(err);
    }
    return res.status(201).json({ user });
    });
  };


   //login
   export const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
      existingUser = await paitentModel.findOne({ email });
    } catch (err) {
      return console.log(err);
    }
    if (!existingUser) {
      return res.status(404).json({ message: "Couldnt Find User By This Email" });
    }
  
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    return res
      .status(200)
      .json({ message: "Login Successfull", user: existingUser });
  };