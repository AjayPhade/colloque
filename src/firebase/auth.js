import { auth, firestore } from "./config";

const signIn = ({ email, password }) => {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {})
        .catch((error) => {
            console.error(error);
        });
};

const signOut = () => {
    auth.signOut();
};

const signUp = async (user, type, checkedSubjects) => {
    const { email, password } = user;
    const { name, role, strikes, department, year, threads, replies } = user;

    //checking for faculty signup

    if (type === "faculty") {
        await auth
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                userCredential.user
                    .updateProfile({ displayName: name, photoURL: "F" })
                    .then(() => userCredential.user.sendEmailVerification())
                    .catch((error) => console.log(error));

                const uid = userCredential.user.uid;
                const facultyRef = firestore.collection("faculty");

                facultyRef
                    .doc(uid)
                    .set({
                        name,
                        email,
                        department,
                        replies,
                        subjects: checkedSubjects,
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => console.log(error));
    } else {
        await auth
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                userCredential.user
                    .updateProfile({ displayName: name })
                    .then(() => userCredential.user.sendEmailVerification())
                    .catch((error) => console.log(error));

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
    }
};

export { signIn, signOut, signUp };
