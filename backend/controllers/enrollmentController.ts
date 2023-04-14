import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma';

export async function enrollCourse(req: Request, res: Response, next: NextFunction) {
    const { id: courseId } = req.params;

    if (!courseId) return next("Course Id is required!");

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
            return next("Cannot enroll in your own course.");

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
        next(error);
    }
}

export async function enrollmentRequests(req: Request, res: Response, next: NextFunction) {
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
        res.status(200).json({ enrollments: fromattedEnrollments });
    } catch (error) {
        next(error);
    }
}

export async function updateEnrollment(req: Request, res: Response, next: NextFunction) {
    const { user: userId, course: courseId, request: reqType } = req.params;

    if (!['accept', 'reject'].includes(reqType)) return next("Invalid Request!");
    if (!userId) return next("User Id cannot be empty!");
    if (!courseId) return next("Course Id cannot be empty!");

    const signedInUserId = res.locals.signedInUser.id;
    try {
        const enrollment = await prisma.enrollment.findFirst({
            where: {
                userId: userId,
                courseId: courseId
            }
        });
        if (enrollment === null) return next("Enrollemnt not Found!");

        const courseInstructor = await prisma.course.findFirst({
            where: {
                id: courseId
            },
            select: {
                instrutorId: true
            }
        });

        if (signedInUserId != courseInstructor?.instrutorId) return next("Unauthorized!");

        let enrollmentStatus;
        if (reqType === "accept") enrollmentStatus = "ACCEPTED";
        else enrollmentStatus = "REJECTED";

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
        let response = enrollmentObj.status === "ACCEPTED" ? "Enrollment request Approved." : "Enrollment request Rejected.";
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

export async function getEnrollmentsStatus(req: Request, res: Response, next: NextFunction) {
    try {
        const userEnrollments = await prisma.enrollment.findMany({
            where: {
                userId: res.locals.signedInUser.id
            },
            include: {
                user: true,
                course: true
            }
        })
        const courseInstructors = await prisma.course.findMany({
            where: {
                id: {
                    in: userEnrollments.map(enrollment => enrollment.courseId)
                }
            },
            include: {
                instructor: true
            }
        });
        const formattedEnrollments = userEnrollments.map((enrollment) => {
            return {
                status: enrollment.status,
                instructor: courseInstructors.find((course) => {
                    return (course.id == enrollment.course.id)
                })?.instructor.name,
                id: enrollment.course.id,
                course: enrollment.course.name
            }
        })
        res.status(200).json({ enrollments: formattedEnrollments });
    } catch (error) {
        next(error);
    }

}