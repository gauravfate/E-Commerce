import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({ storage: storage });



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./public/temp");
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now();
//         cb(null, file.fieldname + "-" + uniqueSuffix);
//     },
// });

// export const upload = multer({ storage: storage });
