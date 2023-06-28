import { WsChatUserMutedDto } from 'shared/models';
import { useRouter } from 'next/router';
import { CLIENT_EVENTS, SERVER_EVENTS } from "common/socket/events";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { SOCKET_URL } from "shared/constants";
import { WsChatJoinedDto, WsChatMessageDto, WsChatMessageReplyToDto, WsChatStatusDto, WsRPCResponseDto } from 'shared/models';
import { signOut } from "shared/redux/slices/authSlice";
import io from "socket.io-client";
import { addMessage, setMessages, setMutedUsers, setUserCount } from '../slices/chatSlice';
import { useAppSelector } from './../../../shared/redux/hooks';

const useChat = () => {
    const router = useRouter();
    const [replyTo, setReplyTo] = useState<WsChatMessageReplyToDto>();
    const [showChatOptions, setShowChatOptions] = useState(false);

    // Modals
    const [showMutedUsers, setShowMutedUsers] = useState(false);
    const [showChatRules, setShowChatRules] = useState(false);

    const [hideChat, setHideChat] = useState(false);

    const dispatch = useDispatch();
    const authData = useAppSelector((state) => state.auth.authData)
    const messages = useAppSelector((state) => state.chat.messages)
    const mutedUsers = useAppSelector((state) => state.chat.mutedUsers)
    const usersCount = useAppSelector((state) => state.chat.usersCount)

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        onSubmit: values => {
            console.log('onSubmit :' + values.message);
            formik.resetForm();
            if (replyTo) setReplyTo(undefined)
        },
    });

    let socket = io(SOCKET_URL,
        {
            path: "/ws", query: { 'jwt': `${authData?.token}` },
        })
    const [isConnected, setIsConnected] = useState(socket.connected)

    useEffect(() => {
        joinChat();

        socket.on('connect', () => {
            setIsConnected(true);
            joinChat()
        });

        socket.on(SERVER_EVENTS.CHAT_JOIN_RESULT, (res: WsRPCResponseDto<WsChatJoinedDto>) => {
            dispatch(setMessages(res.result.messages))
        })

        socket.on(SERVER_EVENTS.CHAT_STATUS, (res: WsChatStatusDto) => {
            dispatch(setUserCount(res.users))
        })

        socket.on(SERVER_EVENTS.CHAT_MESSAGE, (res: WsChatMessageDto) => {
            dispatch(addMessage(res))
        })

        socket.on(SERVER_EVENTS.CHAT_MUTED_USERS, (res: WsChatUserMutedDto[]) => {
            dispatch(setMutedUsers(res))
        })

        return () => {
            socket.disconnect()
            socket.off(SERVER_EVENTS.CHAT_JOIN_RESULT)
            socket.off(SERVER_EVENTS.CHAT_STATUS)
            socket.off(SERVER_EVENTS.CHAT_MESSAGE)
        }
    }, [])

    const joinChat = () => {
        socket.connect()
        socket.emit('CHAT_JOIN', { "key": "1" })
    }

    const sendMessage = (message: string, userId?: number) => {
        socket.emit(CLIENT_EVENTS.CHAT_SEND_MESSAGE, {
            "key": "2",
            "message": message,
            "reply_to": userId ? userId : null
        })
    }

    const onSetReplyTo = (replyTo?: WsChatMessageReplyToDto) => {
        setReplyTo(replyTo)
    }

    const toggleMuteUser = (mute: boolean, userId: string) => {
        socket.emit(CLIENT_EVENTS.CHAT_MUTE, {
            "key": mute ? "4" : "5",
            "user_id": userId,
            "mute": mute
        })
    }

    const onSignOut = () => {
        dispatch(signOut());
        router.push("/");
    }

    return {
        authData, messages, sendMessage, usersCount,
        isConnected, toggleMuteUser, formik, replyTo,
        onSetReplyTo, showChatOptions, setShowChatOptions,
        showChatRules, setShowChatRules, showMutedUsers, setShowMutedUsers,
        hideChat, setHideChat,
        onSignOut, mutedUsers
    }
}

export default useChat