import { useAuth } from "../authContext"
import { seekhsdk } from "../seekh-sdk"

const Request = ({ name, course, status, courseId, userId }: {
    name: string,
    course: string,
    status: string,
    courseId: string
    userId: string
}) => {

    const { user } = useAuth();

    const handleRequest = async (event: any) => {
        try {
            const res = await seekhsdk.Enrollment({ token: user }).updateEnrollment({
                request: event.target.value,
                user: userId,
                course: courseId
            });
            alert(res);
        } catch (error: any) {
            alert(error.msg)
        }

    }

    return (
        <div className='max-w-sm rounded overflow-hidden bg-white my-4 mx-auto text-black shadow-lg hover:shadow-gray-500'>
            <div className='m-4'>
                <b>{name}</b> has requested to join your course : <b>{course}</b>
            </div>
            <div className="flex justify-between">
                <div className="m-4"><b>Status: </b>{status}</div>
                <div className={(status == 'PENDING') ? '' : 'hidden'}>
                    <button value='accept' onClick={handleRequest} className='m-4 bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-700 hover:border-transparent rounded'>
                        Accept
                    </button>
                    <button value='reject' onClick={handleRequest} className='m-4 bg-transparent hover:bg-red-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-700 hover:border-transparent rounded'>
                        Reject
                    </button>
                </div>
            </div>
        </div >
    );
}

export default Request;