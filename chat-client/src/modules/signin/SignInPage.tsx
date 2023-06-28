import type { NextPage } from "next";
import Head from "next/head";
import { Card } from "shared/components";
import ContainedButton from "shared/components/ContainedButton/ContainedButton";
import userIcon from "../../shared/assets/user.png";
import useSignIn from "./hooks/useSignIn";
import styles from "./SignInPage.module.scss";

const SignInPage: NextPage = () => {
  const { formik, submitDisable } = useSignIn();
  return (
    <div className={styles.container}>
      <Head>
        <title>SignIn</title>
        <meta name="description" content="React chat app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.chatContainer}>
          <Card>
            <div className={styles.title}>
              <p>Welcome</p>
            </div>
            <div className={styles.iconContainer}>
              <img
                className={styles.userIcon}
                src={userIcon.src}
                alt="user-icon"
              />
            </div>
            <span className={styles.txt}>Choose a username to enter chat.</span>
            <div className={styles.inputContainer}>
              <label htmlFor="name" className={styles.inputTitle}>
                Username
              </label>
              <form onSubmit={formik.handleSubmit}>
                <input
                  type="text"
                  id="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  className={styles.input}
                  placeholder="Enter your username"
                />
                <ContainedButton title="Sign In" disabled={submitDisable} onClick={formik.handleSubmit} />
              </form>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SignInPage;
