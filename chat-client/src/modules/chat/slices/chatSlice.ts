import { WsChatUserMutedDto } from 'shared/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WsChatMessageDto } from 'shared/models'

export interface ChatState {
    messages: WsChatMessageDto[]
    mutedUsers: WsChatUserMutedDto[]
    usersCount: number
}

const initialState = { messages: [], mutedUsers: [], usersCount: 0 }

const chatSlice = createSlice({
    name: 'chat',
    initialState: initialState as ChatState,
    reducers: {
        setMessages(state, action: PayloadAction<WsChatMessageDto[]>) {
            state.messages = action.payload
        },
        addMessage(state, action: PayloadAction<WsChatMessageDto>) {
            state.messages.push(action.payload)
        },
        setUserCount(state, action: PayloadAction<number>) {
            state.usersCount = action.payload
        },
        setMutedUsers(state, action: PayloadAction<WsChatUserMutedDto[]>) {
            state.mutedUsers = action.payload
        },
    },
})

export const { addMessage, setMessages, setUserCount, setMutedUsers } = chatSlice.actions
export default chatSlice.reducer