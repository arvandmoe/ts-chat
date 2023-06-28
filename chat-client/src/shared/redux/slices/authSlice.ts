import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthenticationTokenDto, RegisterDto } from 'shared/models'
import AuthService from 'shared/services/authService'

export interface AuthState {
    authData: AuthenticationTokenDto | undefined
}

const initialState = { authData: undefined }

export const signIn = createAsyncThunk(
    'auth/signInUser',
    async (registerDto: RegisterDto) => {
        const response = await AuthService.signIn(registerDto)
        return (await response.data) as AuthenticationTokenDto
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState as AuthState,
    reducers: {
        signOut(state) {
            state.authData = undefined
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.authData = action.payload
        })
    },
})

export const { signOut, } = authSlice.actions
export default authSlice.reducer