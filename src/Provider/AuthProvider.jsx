import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from '../../src/Firebase/firebase.init';
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();


    // Current User State Observer.
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        };

                        // Store User Details In Database.
                        const account = currentUser.providerData[0].providerId;
                        const userDetails = {
                            displayName: currentUser.displayName,
                            phoneNumber: currentUser.phoneNumber,
                            email: currentUser.email,
                            photoURL: currentUser.photoURL,
                            accountType: account === "google.com" ? "Google" : "Email&Password",
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                        };
                        axiosSecure.post('/customers/add', userDetails)
                            .then(res => {
                                // console.log(res.data);
                                // toast.success("user Information saved in database", { position: "top-center", autoClose: 2500 });
                            })
                            .catch(err => {
                                // console.log(err.message);
                            })
                    })
                    .catch(err => {
                        // console.log(err.message);
                    })
            }
            else {
                localStorage.removeItem('access-token');
            }
        });

        return () => {
            return unSubscribe();
        }
    }, []);


    // Create A New User.
    const CreateUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };


    // Update User Information.
    const UpdateUserInfo = (userInfo) => {
        const { name, image = null } = userInfo;
        return updateProfile(auth.currentUser, { displayName: name, photoURL: image });
    };


    // Login/SignUP User.
    const LoginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };


    // Login With Google.
    const GoogleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };


    // Logout Current User
    const LogoutUser = () => {
        setLoading(true);
        return signOut(auth);
    };


    // Context Value.
    const authInfo = {
        user,
        loading,
        CreateUser,
        UpdateUserInfo,
        LoginUser,
        GoogleLogin,
        LogoutUser
    }



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;