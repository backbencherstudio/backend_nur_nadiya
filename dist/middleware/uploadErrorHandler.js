import multer from "multer";
export const handleUploadError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        switch (error.code) {
            case 'LIMIT_FILE_SIZE':
                return res.status(400).json({
                    success: false,
                    message: "File size too large. Maximum allowed size is 2MB."
                });
            case 'LIMIT_FILE_COUNT':
                return res.status(400).json({
                    success: false,
                    message: "Too many files. Only one file is allowed."
                });
            case 'LIMIT_UNEXPECTED_FILE':
                return res.status(400).json({
                    success: false,
                    message: "Unexpected field name. Use 'image' field for file upload."
                });
            default:
                return res.status(400).json({
                    success: false,
                    message: "File upload error: " + error.message
                });
        }
    }
    if (error.message === 'Only image files are allowed!') {
        return res.status(400).json({
            success: false,
            message: "Only image files are allowed."
        });
    }
    // Pass other errors to the next error handler
    next(error);
};
//# sourceMappingURL=uploadErrorHandler.js.map