import { useFormik } from "formik";
import { useRouter } from 'next/router';
import { RegisterDto } from "shared/models";
import { useAppDispatch } from "shared/redux/hooks";
import { signIn } from "shared/redux/slices/authSlice";

const useSignIn = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            username: ''
        },
        onSubmit: values => {
            onSignIn()
        },
    });

    const submitDisable = formik.values.username === "" ? true : false;

    const onSignIn = () => {
        const registerDto: RegisterDto = { user_name: formik.values.username }
        dispatch(signIn(registerDto))
            .then(() => {
                router.push('/chat')
            })
    }
    return { formik, submitDisable }
}

export default useSignIn