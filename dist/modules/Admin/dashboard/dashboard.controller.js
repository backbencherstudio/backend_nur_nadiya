import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getDashboardData = async (req, res) => {
    try {
        const total_maid_enquiries = await prisma.maidEnquiry.count();
        const total_employer_enquiries = await prisma.employerEnquiry.count();
        const available_bio_data = await prisma.bioData.count({
            where: {
                status: "available"
            }
        });
        const confirmed_bio_data = await prisma.bioData.count({
            where: {
                status: "confirmed"
            }
        });
        res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully",
            data: {
                total_maid_enquiries: total_maid_enquiries,
                total_employer_enquiries: total_employer_enquiries,
                available_bio_data: available_bio_data,
                confirmed_bio_data: confirmed_bio_data,
            }
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: `Error getting dashboard data: ${error.message || error}`,
            data: null
        });
    }
};
export const getAllEnquiries = async (req, res) => {
    try {
        // Extract query parameters
        const { search = '', type = '', page = '1', limit = '10' } = req.query;
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const skip = (pageNum - 1) * limitNum;
        // Build where clauses for both maid and employer enquiries
        const maidWhereClause = {};
        const employerWhereClause = {};
        // Search functionality
        if (search) {
            const searchCondition = {
                OR: [
                    { full_name: { contains: search, mode: 'insensitive' } },
                    { mobile_number: { contains: search, mode: 'insensitive' } },
                    { wp_number: { contains: search, mode: 'insensitive' } },
                    { nationality: { contains: search, mode: 'insensitive' } }
                ]
            };
            maidWhereClause.AND = [searchCondition];
        }
        if (search) {
            const searchCondition = {
                OR: [
                    { full_name: { contains: search, mode: 'insensitive' } },
                    { contact_number: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } }
                ]
            };
            employerWhereClause.AND = [searchCondition];
        }
        // Type filter
        if (type && type !== 'all') {
            if (type === 'maid') {
                // Only get maid enquiries
                const maidEnquiries = await prisma.maidEnquiry.findMany({
                    where: maidWhereClause,
                    skip: skip,
                    take: limitNum,
                    orderBy: { createdAt: 'desc' }
                });
                const totalCount = await prisma.maidEnquiry.count({ where: maidWhereClause });
                const transformedData = maidEnquiries.map((enquiry) => ({
                    id: enquiry.id,
                    name: enquiry.full_name,
                    type: 'Maid',
                    contact: enquiry.mobile_number,
                    date: enquiry.createdAt.toISOString().split('T')[0],
                    time: enquiry.createdAt.toTimeString().split(' ')[0].substring(0, 5),
                    source: 'Website', // Default source
                    status: enquiry.status // Default status
                }));
                const totalPages = Math.ceil(totalCount / limitNum);
                const hasNextPage = pageNum < totalPages;
                const hasPrevPage = pageNum > 1;
                return res.status(200).json({
                    success: true,
                    message: "Enquiries fetched successfully",
                    data: {
                        enquiries: transformedData,
                        pagination: {
                            currentPage: pageNum,
                            totalPages: totalPages,
                            totalCount: totalCount,
                            hasNextPage: hasNextPage,
                            hasPrevPage: hasPrevPage,
                            limit: limitNum
                        }
                    }
                });
            }
            else if (type === 'employer') {
                // Only get employer enquiries
                const employerEnquiries = await prisma.employerEnquiry.findMany({
                    where: employerWhereClause,
                    skip: skip,
                    take: limitNum,
                    orderBy: { createdAt: 'desc' }
                });
                const totalCount = await prisma.employerEnquiry.count({ where: employerWhereClause });
                const transformedData = employerEnquiries.map((enquiry) => ({
                    id: enquiry.id,
                    name: enquiry.full_name,
                    type: 'Employer',
                    contact: enquiry.contact_number,
                    date: enquiry.createdAt.toISOString().split('T')[0],
                    time: enquiry.createdAt.toTimeString().split(' ')[0].substring(0, 5),
                    source: 'Website', // Default source
                    status: enquiry.status // Default status
                }));
                const totalPages = Math.ceil(totalCount / limitNum);
                const hasNextPage = pageNum < totalPages;
                const hasPrevPage = pageNum > 1;
                return res.status(200).json({
                    success: true,
                    message: "Enquiries fetched successfully",
                    data: {
                        enquiries: transformedData,
                        pagination: {
                            currentPage: pageNum,
                            totalPages: totalPages,
                            totalCount: totalCount,
                            hasNextPage: hasNextPage,
                            hasPrevPage: hasPrevPage,
                            limit: limitNum
                        }
                    }
                });
            }
        }
        // Get both maid and employer enquiries
        const [maidEnquiries, employerEnquiries] = await Promise.all([
            prisma.maidEnquiry.findMany({
                where: maidWhereClause,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.employerEnquiry.findMany({
                where: employerWhereClause,
                orderBy: { createdAt: 'desc' }
            })
        ]);
        // Combine and sort by creation date
        const allEnquiries = [
            ...maidEnquiries.map(enquiry => ({ ...enquiry, type: 'Maid' })),
            ...employerEnquiries.map(enquiry => ({ ...enquiry, type: 'Employer' }))
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        // Apply pagination to combined results
        const totalCount = allEnquiries.length;
        const paginatedEnquiries = allEnquiries.slice(skip, skip + limitNum);
        // Transform data
        const transformedData = paginatedEnquiries.map((enquiry) => ({
            id: enquiry.id,
            name: enquiry.full_name,
            type: enquiry.type,
            contact: enquiry.type === 'Maid' ? enquiry.mobile_number : enquiry.contact_number,
            date: enquiry.createdAt.toISOString().split('T')[0],
            time: enquiry.createdAt.toTimeString().split(' ')[0].substring(0, 5),
            source: 'Website', // Default source
            status: enquiry.status // Default status
        }));
        // Calculate pagination info
        const totalPages = Math.ceil(totalCount / limitNum);
        const hasNextPage = pageNum < totalPages;
        const hasPrevPage = pageNum > 1;
        res.status(200).json({
            success: true,
            message: "Enquiries fetched successfully",
            data: {
                enquiries: transformedData,
                pagination: {
                    currentPage: pageNum,
                    totalPages: totalPages,
                    totalCount: totalCount,
                    hasNextPage: hasNextPage,
                    hasPrevPage: hasPrevPage,
                    limit: limitNum
                }
            }
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: `Error getting enquiries: ${error.message || error}`,
            data: null
        });
    }
};
export const changeEnquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        // the id can be of maidEnquiry or employerEnquiry
        const maidEnquiry = await prisma.maidEnquiry.findUnique({
            where: { id: id }
        });
        if (!maidEnquiry) {
            await prisma.employerEnquiry.update({
                where: { id: id },
                data: {
                    status: status
                }
            });
            res.status(200).json({
                success: true,
                message: "Enquiry status changed successfully",
                data: null
            });
        }
        if (maidEnquiry) {
            await prisma.maidEnquiry.update({
                where: { id: id },
                data: {
                    status: status
                }
            });
            res.status(200).json({
                success: true,
                message: "Enquiry status changed successfully",
                data: null
            });
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: `Error changing enquiry status: ${error.message || error}`,
            data: null
        });
    }
};
//# sourceMappingURL=dashboard.controller.js.map