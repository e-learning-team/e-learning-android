import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { formatTimeStampTo_DDMMYYY } from "../../utils/helper"
import { faEdit, faFileVideo } from "@fortawesome/free-regular-svg-icons"
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { formatTimeStampTo_DDMMYYY } from "../utils/helper"
import { Button, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { apiDeleteComment, apiPostComment } from "../apis/comment"
import { images } from "../constants"
// import { Spinner } from "@material-tailwind/react"
// import { toast } from 'react-toastify';

const CommentItem = ({ comment, currentUser, reload, isReply }: any) => {
    const [edit, setEdit] = useState(false);
    const [newComment, setNewComment] = useState(comment.content);
    const [reply, setReply] = useState(false);
    const [replyComment, setReplyComment] = useState("");
    const [error, setError] = useState<any>(null);
    const handleSaveComment = async () => {
        if (newComment === "") return setError("Please enter your comment");
        if (newComment.length < 10) return setError("Comment is too short");
        if (newComment.length > 500) return setError("Comment is too long");
        console.log(newComment);
        const data = {
            id: comment.id,
            content: newComment,
            // reference_id: comment.reference_id,
            // type: "COURSE",
            userId: comment.create_by,
            // parent_id: comment?.parent_id || ''
        }
        try {
            const res = await apiPostComment(data);
            console.log(res);
            reload && reload(true);
        } catch (error) {
            console.log(error);
        }
        setEdit(false);
        setNewComment("");
    }
    const handleSaveReplyComment = async () => {
        if (replyComment === "") return setError("Please enter your comment");
        if (replyComment.length < 10) return setError("Comment is too short");
        if (replyComment.length > 500) return setError("Comment is too long");
        const data = {
            content: replyComment,
            reference_id: comment.reference_id,
            type: "COURSE",
            userId: currentUser,
            parent_id: isReply || comment.id
        }
        try {
            const res = await apiPostComment(data);
            console.log(res);
            reload && reload(true);
        } catch (error) {
            console.log(error);
        }
        setReply(false);
        setReplyComment("");
    }
    const handleDeleteComment = async () => {
        try {
            const res = await apiDeleteComment(comment.id);
            if (res.status === 1) {
                // toast.success(`Delete bình luận thành công`, {
                //     position: toast.POSITION.TOP_RIGHT,
                // });
            }
            // console.log(res);
            reload && reload(true);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View className={` text-base bg-white rounded-lg ${isReply && ' ml-10 '}`}>
            <View className="flex flex-row justify-between items-center mb-2">
                <View className="flex flex-row items-center">
                    <Image
                        source={comment.user_detail?.avatar ? { uri: comment.user_detail?.avatar } : images.profile}
                        // source={comment.user_detail?.avatar ? comment.user_detail?.avatar : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                        className="mr-2 w-10 h-10 rounded-full"
                    // style={{ borderColor: COLORS.white }}
                    />
                    {/* <img
                        className="mr-2 w-10 h-10 rounded-full"
                        src={`${comment.user_detail?.avatar}` || "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                        alt={comment.user_detail?.full_name + " - " + comment.user_detail?.email} /> */}
                    <View className="flex flex-col">
                        <Text className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                            {comment.user_detail?.full_name}
                        </Text>
                        {/* <Text className="inline-flex items-center mr-3 text-sm text-gray-500  font-normal">
                            {comment.user_detail?.email}
                        </Text> */}
                        <Text className="text-sm  text-gray-600 dark:text-gray-700">
                            <Text>At {formatTimeStampTo_DDMMYYY(comment.created_at)}</Text>
                        </Text>
                    </View>
                </View>
            </View>
            {!edit ? (
                <Text className="ml-12 text-gray-500 dark:text-gray-700">
                    {comment.content}
                </Text>
            ) : (
                <>
                    <View className={`py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 focus-within:border-gray-600 dark:border-gray-400 ${error && 'border-red-600'}`}>
                        <TextInput
                            multiline={true}
                            numberOfLines={6}
                            onChangeText={(e: any) => {
                                setNewComment(e)
                                setError(null);
                            }}
                            placeholder="Your comment..."
                            // onFocus={(e: any) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                            value={newComment}
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none  dark:placeholder-gray-400 "
                        />
                        {/* <textarea id="comment"
                            onChangeText={(e: any) => {
                                setNewComment(e)
                                setError(null);
                            }}
                            // autoFocus
                            onFocus={(e: any) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                            value={newComment}
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none  dark:placeholder-gray-400 "
                            placeholder="Bình luận của bạn..." required></textarea> */}
                    </View>
                    {error && <Text className="text-red-600 text-sm mb-4">{error}</Text>}
                </>
            )}
            <View className="flex ml-12 flex-row justify-between items-center mt-4 space-x-4">
                {/* {!isReply ? ( */}
                <TouchableOpacity
                    onPress={() => setReply(!reply)}
                    className="flex flex-row items-center text-sm text-gray-500 hover:underline dark:text-gray-700 font-medium">
                    {/* <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                    </svg> */}
                    <Text className="flex flex-row items-center text-sm text-gray-500 hover:underline dark:text-gray-700 font-medium">Reply</Text>
                </TouchableOpacity>

                {/* ) : (
                    <View></View>
                )} */}

                {comment.user_detail?.id === currentUser && (
                    <View className="flex flex-row items-center space-x-4">
                        {edit ? (
                            <>
                                <TouchableOpacity
                                    onPress={handleSaveComment}
                                    className="flex flex-row items-center space-x-1 text-sm text-blue-500 hover:underline dark:text-gray-700 font-medium">
                                    <Text className="flex flex-row items-center space-x-1 text-sm text-blue-500 hover:underline dark:text-gray-700 font-medium">Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setEdit(false);
                                        setNewComment(comment.content);
                                        setError(null);
                                    }}
                                    className="flex flex-row items-center space-x-1 text-sm text-gray-500 hover:underline dark:text-gray-700 font-medium">
                                    <Text className="flex flex-row items-center space-x-1 text-sm text-gray-500 hover:underline dark:text-gray-700 font-medium">Cancel</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity
                                    onPress={() => {
                                        setEdit(true)
                                    }}
                                    className="flex flex-row items-center space-x-1 text-sm text-blue-500 hover:underline dark:text-gray-700 font-medium">
                                    <Text className="flex flex-row items-center space-x-1 text-sm text-blue-500 hover:underline dark:text-gray-700 font-medium">Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleDeleteComment}
                                    className="flex flex-row items-center space-x-1 text-sm text-red-500 hover:underline dark:text-gray-700 font-medium">
                                    <Text className="flex flex-row items-center space-x-1 text-sm text-red-500 hover:underline dark:text-gray-700 font-medium">Delete</Text>
                                </TouchableOpacity>
                            </>
                        )}

                    </View>
                )}
            </View >
            {reply && (
                <>
                    <View className={`py-2 mt-4 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 focus-within:border-gray-600 dark:border-gray-400 ${error && 'border-red-600'}`}>
                        <TextInput
                            multiline={true}
                            numberOfLines={6}
                            onChangeText={(e: any) => {
                                setReplyComment(e)
                                setError(null);
                            }}
                            placeholder="Your comment..."
                            // onFocus={(e: any) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                            value={replyComment}
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none  dark:placeholder-gray-400 " />
                        {/* <textarea id="comment" rows="6"
                            onChangeText={(e: any) => {
                                setReplyComment(e)
                                setError(null);
                            }}
                            autoFocus
                            onFocus={(e: any) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                            value={replyComment}
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none  dark:placeholder-gray-400 "
                            placeholder="Bình luận của bạn..." required></textarea> */}
                    </View>
                    {error && <Text className="text-red-600 text-sm mb-4">{error}</Text>}
                    <View className="flex flex-row">
                        <View className="flex flex-row space-x-4">
                            <TouchableOpacity
                                onPress={handleSaveReplyComment}
                                className="flex flex-row items-center space-x-1 text-sm text-blue-500 hover:underline dark:text-gray-700 font-medium">
                                <Text className="flex flex-row items-center space-x-1 text-sm text-blue-500 hover:underline dark:text-gray-700 font-medium">
                                    Reply
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setEdit(false);
                                    setNewComment(comment.content);
                                    setReplyComment("");
                                    setError(null);
                                    setReply(false);
                                }}
                                className="flex flex-row items-center space-x-1 text-sm text-gray-500 hover:underline dark:text-gray-700 font-medium">
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
        </View >
    )
}
export const Comments = ({ comments, currentUser, courseId, reload }: any) => {
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState<any>(null);
    const handleSubmit = async () => {
        if (!currentUser) return setError("Please login to comment");
        if (newComment === "") return setError("Please enter your comment");
        if (newComment.length < 10) return setError("Comment is too short");
        if (newComment.length > 500) return setError("Comment is too long");
        const data = {
            content: newComment,
            reference_id: courseId,
            type: "COURSE",
            userId: currentUser
        }
        try {
            const res = await apiPostComment(data);
            console.log(res);
            reload && reload(true);
        } catch (error) {
            console.log(error);
        }
        setNewComment("");
    }
    // useEffect(() => {
    //     if(!currentUser){
    //         setError("Please login to comment");
    //     }
    // }, [currentUser])
    return (
        <View className="bg-white py-8 lg:py-8 antialiased">
            <View className="">
                <View className="mb-6">
                    <View className={`py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 focus-within:border-gray-600 dark:border-gray-400 ${error && 'border-red-600'}`}>
                        <TextInput
                            multiline={true}
                            numberOfLines={6}
                            onChangeText={(e: any) => {
                                setError(null);
                                setNewComment(e)
                            }}
                            value={newComment} />
                        {/* <textarea id="comment" rows="6"
                            onChangeText={(e: any) => {
                                setError(null);
                                setNewComment(e)
                            }}
                            value={newComment}
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none  dark:placeholder-gray-400 "
                            placeholder="Bình luận của bạn..." required></textarea> */}
                    </View>
                    {error && <Text className="text-red-600 text-sm mb-4">{error}</Text>}
                    <TouchableOpacity onPress={handleSubmit}
                        className="bg-[#42c6a5] rounded-md "
                    >
                        <Text className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Comment
                        </Text>
                    </TouchableOpacity>
                </View>
                {comments?.map((comment: any, index: any) => (
                    <View key={index}>
                        <CommentItem comment={comment} currentUser={currentUser} reload={() => reload && reload(true)} />

                        {comment.reply?.map((reply: any, indexx: any) => (
                            <View className="mt-10" key={indexx}>
                                {indexx < comment.reply.length && <View className="" />}
                                <CommentItem comment={reply} currentUser={currentUser} isReply={comment.id} reload={() => reload && reload(true)} />
                            </View>
                        ))}

                        {index < comments.length - 1 && <View className="my-4 border-gray-200 dark:border-gray-400" />}
                    </View>
                ))}



            </View>
        </View>
    )
}