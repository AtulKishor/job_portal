import multer from "multer";

// Multer storage configuration
const storageConfig = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

export const uploadFile = multer({
    storage: storageConfig,
}).single('resume');
