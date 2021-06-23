import { auth, firestore } from "./config";

const signIn = ({ email, password }) => {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            
        })
        .catch((error) => {
            console.error(error);
        });
};

const signOut = () => {
    auth.signOut();
};

const signUp = (user) => {
    const { email, password } = user;
    const { name, role, strikes, department, year, threads } = user;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            userCredential.user.sendEmailVerification();

            const uid = userCredential.user.uid;
            const studentsRef = firestore.collection("students");
            const coursesRef = firestore.collection("courses");
            const course = coursesRef.doc(department);

            studentsRef
                .doc(uid)
                .set({
                    name,
                    email,
                    role,
                    strikes,
                    department,
                    year,
                    threads,
                    course,
                })
                .catch((error) => {
                    console.error(error);
                });
        })
        .catch((error) => {
            console.error(error);
        });
};

export { signIn, signOut, signUp };
