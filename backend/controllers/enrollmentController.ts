import { Request, Response } from 'express';
import prisma from '../prisma';

export async function enrollCourse(req: Request, res: Response) {
    const { id: courseId } = req.params;

    if (!courseId) return res.status(400).json("Course Id is required for enrollment!");

    const signedInUserId = res.locals.signedInUser.id;
    try {
        const course = await prisma.course.findFirst({
            where: {
                id: courseId
            }
        });
        if (!course)
            return res.status(400).json("Course Id is not valid!");

        if (course.instrutorId === signedInUserId)
            return res.status(400).json("Cannot enroll in your own course.");
    } catch (error) {
        console.log(error);
        res.status(500).json("Something Went Wrong!");
    }

    try {
        const enrollment = await prisma.enrollment.create({
            data: {
                user: {
                    connect: {
                        id: signedInUserId
                    }
                },
                course: {
                    connect: {
                        id: courseId
                    }
                }
            }
        });
        res.status(200).json("Enrollment request sent!");
    } catch (error) {
        console.log(error);
        res.status(500).json("Something Went Wrong!");
    }
}

export async function enrollmentRequests(req: Request, res: Response) {
    const signedInUserId = res.locals.signedInUser.id;

    try {
        const courses = await prisma.course.findMany({
            where: {
                instrutorId: signedInUserId
            },
            select: {
                id: true
            }
        });
        const courseIds = courses.map((courseObj) => {
            return courseObj.id;
        });
        const enrollments = await prisma.enrollment.findMany({
            where: {
                courseId: {
                    in: courseIds
                }
            }, select: {
                user: true,
                course: true,
                status: true,
            }
        });
        const fromattedEnrollments = enrollments.map((enrollmentObj) => {
            return {
                userName: enrollmentObj.user.name,
                userId: enrollmentObj.user.id,
                courseName: enrollmentObj.course.name,
                courseId: enrollmentObj.course.id,
                status: enrollmentObj.status
            }
        });
        res.status(200).json({ enrollemnts: fromattedEnrollments });
    } catch (error) {
        console.log(error);
        res.status(500).json("Something Went Wrong!");
    }
}

export async function updateEnrollment(req: Request, res: Response) {
    const { user: userId, course: courseId, request: reqType } = req.params;

    if (!userId) return res.status(400).json("User Id cannot be empty!");
    if (!courseId) return res.status(400).json("Course Id cannot be empty!");

    const signedInUserId = res.locals.signedInUser.id;
    try {
        const enrollment = await prisma.enrollment.findFirst({
            where: {
                userId: userId,
                courseId: courseId
            }
        });
        if (enrollment === null) return res.status(404).json("Enrollemnt Request with these parameters doesn't exists!");

        const courseInstructor = await prisma.course.findFirst({
            where: {
                id: courseId
            },
            select: {
                instrutorId: true
            }
        });

        if (signedInUserId != courseInstructor?.instrutorId) return res.status(404).json("Unauthorized!");

        let enrollmentStatus;
        if (reqType === "accept") enrollmentStatus = "ACCEPTED";
        else if (reqType === "reject") enrollmentStatus = "REJECTED";
        else return res.status(400).json("Invalid Request!");

        const enrollmentObj = await prisma.enrollment.update({
            where: {
                userId_courseId: {
                    userId: userId,
                    courseId: courseId
                }
            },
            data: {
                status: enrollmentStatus
            }
        });
        let response = enrollmentObj.status === "APPROVED" ? "Enrollment request Approved." : "Enrollment request Rejected.";
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json("Something Went Wrong!");
    }
}