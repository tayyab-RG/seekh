import { useAuth } from "../authContext"
import { seekhsdk } from "../seekh-sdk"

const Course = ({ id, title, description, instructor, enroll }: {
    id: string
    title: string
    description: string
    instructor: string
    enroll: boolean
}) => {

    const { user } = useAuth();

    const handleEnroll = async (event: any) => {
        try {
            const res = await seekhsdk.Enrollment({ token: user }).enrollCourse({ courseId: id });
            alert(res);
        } catch (error: any) {
            alert(error.msg);
        }

    }

    return (
        <div className='max-w-sm rounded shadow-lg hover:shadow-white my-4 mb-8'>
            <div className="flex justify-center bg-white">
                <img src='/seekh.png' className="my-8" alt='course' />
            </div>
            <div className='text-xl text-black bg-gray-200 text-center py-2'>{title}</div>
            <div className='text-xl text-black bg-gray-300 text-center py-2'><b>By: </b>{instructor}</div>
            <div className='text-md text-black bg-gray-200 px-4 py-2 text-justify max-h-36 overflow-hidden'>{description}</div>
            <button onClick={handleEnroll} className={enroll ? 'w-full border-gray-400 bg-gray-300 hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 rounded' : 'hidden'}>
                Enroll
            </button>
        </div>
    );
}

export default Course