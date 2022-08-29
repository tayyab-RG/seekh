import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma';

// TODO: for development only, testing purposes
export async function getAllCourses(req: Request, res: Response) {
    const allCourses = await prisma.course.findMany({
        include: {
            instructor: true
        }
    });
    res.status(200).json({ allCourses });
}

export async function createCourse(req: Request, res: Response, next: NextFunction) {
    let { name } = req.body;

    if (!name) return next("Course Name Cannot be Empty!");

    try {
        const course = await prisma.course.create({
            data: {
                name: name,
                instructor: {
                    connect: { id: res.locals.signedInUser.id }
                }
            },
            include: {
                instructor: true,
            }
        })
        res.status(201).json({ courseName: course.name, courseId: course.id, instructorId: course.instrutorId })
    } catch (error) {
        next(error);
    }
}

export async function getUserCourses(req: Request, res: Response, next: NextFunction) {
    try {
        const courses = await prisma.course.findMany({
            where: {
                instrutorId: res.locals.signedInUser.id
            },
            include: {
                instructor: true,
            }
        });
        const formattedCourses = courses.map((course) => {
            return {
                id: course.id,
                name: course.name,
                instructor: course.instructor.name
            };
        });
        res.status(200).json({ courses: formattedCourses });
    } catch (error) {
        next(error);
    }
}

export async function deleteCourse(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        const userCourses = await prisma.course.findMany({
            where: {
                AND: [
                    { instrutorId: res.locals.signedInUser.id },
                    { id: id }
                ]
            }
        });
        if (!userCourses || userCourses.length === 0) return next("Unauthorized!");

        const deletedCourse = await prisma.course.delete({
            where: {
                id: id
            }
        });
        res.status(200).json("Course Deleted!");
    } catch (error) {
        next(error);
    }
}

export async function getCourse(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!id) return next("Course Id is required!");

    try {
        const course = await prisma.course.findFirst({
            where: {
                id: id
            },
            select: {
                name: true,
                instructor: true,
                instrutorId: true
            }
        });

        if (!course) return next("Course not Found!");

        res.status(200).json({
            courseName: course.name,
            instructorName: course.instructor.name
        });
    } catch (error) {
        next(error);
    }

}

export async function updateCourse(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next("Course Id is required!");

    const { name } = req.body;
    if (!name) return next("Course name is required!");

    try {
        const course = await prisma.course.update({
            where: {
                id: id
            }, data: {
                name: name
            },
            include: {
                instructor: true
            }
        });
        res.status(200).json({ courseName: course.name, instructorName: course.instructor.name });
    } catch (error) {
        next(error)
    }
}