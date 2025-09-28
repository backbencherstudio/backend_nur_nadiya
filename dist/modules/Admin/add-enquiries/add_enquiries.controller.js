export const addEnquiry = async (req, res) => {
    try {
        console.log("working");
        res.status(200).json({
            success: true,
            message: "Enquiry added successfully"
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};
//# sourceMappingURL=add_enquiries.controller.js.map