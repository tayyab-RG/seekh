import { useRouter } from "next/router"

const Enrollment = ({ course, status, courseId, instructor }: {
    course: string,
    status: string,
    courseId: string
    instructor: string
}) => {

    const router = useRouter();

    return (
        <div className='max-h-sm w-full mx-36 rounded overflow-hidden bg-white my-4 mx-auto text-black shadow-lg hover:shadow-gray-500'>
            <div className="flex justify-evenly">
                <div className="flex justify-center bg-white w-1/4">
                    <img src='/seekh.png' className="m-8" alt='course' />
                </div>
                <div className="flex flex-col w-3/4">
                    <div className="h-1/3 w-full flex">
                        <div className="w-1/3 bg-gray-100 px-24 py-4 text-lg"><b>Course</b></div>
                        <div className="w-2/3 bg-gray-200 px-24 py-4 text-lg">{course}</div>
                    </div>
                    <div className="h-1/3 w-full flex">
                        <div className="w-1/3 bg-gray-200 px-24 py-4 text-lg"><b>Instructor</b></div>
                        <div className="w-2/3 bg-gray-100 px-24 py-4 text-lg">{instructor}</div>
                    </div>
                    <div className="h-1/3 w-full flex">
                        <div className="w-1/3 bg-gray-100 px-24 py-4 text-lg"><b>Status</b></div>
                        <div className="w-2/3 bg-gray-200 px-24 py-4 text-lg flex justify-between">
                            {status}
                            <div className={status == 'ACCEPTED' ? '' : 'hidden'}>
                                <button
                                    value={status == 'ACCEPTED' ? courseId : ''}
                                    onClick={() => router.push(`/course/${courseId}`)}
                                    className='p-1 bg-transparent text-sm hover:bg-gray-500 text-gray-700 hover:text-white border border-gray-700 hover:border-transparent rounded'>
                                    Go to Course
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Enrollment;