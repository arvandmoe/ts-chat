import { axiosClient } from 'common/network/axios-client';
import { Todo } from 'models/Todo';
import { AuthenticationTokenDto, RegisterDto } from 'shared/models';

const signIn = async (registerDto: RegisterDto) => {
    const response = await axiosClient.post<AuthenticationTokenDto>('auth/me', registerDto)
    return response
}

const AuthService = {
    signIn,
}

export default AuthService
