import multer, { diskStorage } from "multer";

export default multer({
  storage: diskStorage({
    destination: (req, file, callback) => {
      callback(null, "public/");
    },
    filename: (req, file, calback) => {
      calback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
}).single("image");