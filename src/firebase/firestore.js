import firebase from "firebase";
import { firestore } from "./config";
import { auth } from "./config";

const addThread = async (thread) => {
    thread.description = encodeText(thread.description);
    const uid = auth.currentUser.uid;
    const userRef = firestore.collection("students").doc(uid);
    const threadsRef = firestore.collection("threads");

    if (thread.anonymous === true) {
        thread.isVerified = false;
    } else {
        thread.isVerified = true;
    }

    thread.timestamp = new Date();
    thread.postedBy = userRef;

    const threads = await threadsRef.get();
    const threadID = (threads.size + 10001).toString();

    await threadsRef
        .doc(threadID)
        .set(thread)
        .catch((error) => console.error(error));

    const currentThread = threadsRef.doc(threadID);

    await userRef
        .update({
            threads: firebase.firestore.FieldValue.arrayUnion(currentThread),
        })
        .catch((error) => console.error(error));
};

const getSubjects = async (user) => {
    const subjects = [];

    if (user !== null) {
        let allSubjects = await firestore
            .collection("courses")
            .doc("CSE")
            .get();
        allSubjects = allSubjects.data();

        for (let i = 1; i <= 3; i++) {
            subjects.push(...allSubjects[i.toString()]);
        }
    } else {
        const student = await firestore
            .collection("students")
            .doc(auth.currentUser.uid)
            .get();

        const courseRef = student.data().course;
        const year = student.data().year;
        let allSubjects = await courseRef.get();
        allSubjects = allSubjects.data();

        for (let i = 1; i <= year; i++) {
            subjects.push(...allSubjects[i.toString()]);
        }
    }

    return subjects;
};

const addReply = async (reply, type, id) => {
    reply.content = encodeText(reply.content);
    const uid = auth.currentUser.uid;
    const threadRef = firestore.collection("threads").doc(id);
    const userRef = firestore.collection(type).doc(uid);

    if (reply.anonymous === true) {
        reply.isVerified = false;
    } else {
        reply.isVerified = true;
    }

    await userRef.get().then(async (snap) => {
        const userData = snap.data();
        reply.timestamp = new Date();
        reply.repliedBy = userRef;
        if (userData.role === undefined) {
            await threadRef
                .update({
                    facultyReplies:
                        firebase.firestore.FieldValue.arrayUnion(reply),
                })
                .catch((error) => console.error(error));
        } else {
            await threadRef
                .update({
                    studentReplies:
                        firebase.firestore.FieldValue.arrayUnion(reply),
                })
                .catch((error) => console.error(error));
        }
    });
};

const decodeText = (str) => {
    str = str.replace(/\\n/g, "\n");
    str = str.replace(/\\t/g, "  ");
    return str;
};

const encodeText = (str) => {
    str = str.replace(/\n/g, "\\n");
    str = str.replace(/  /g, "\\t");
    return str;
};

export { addThread, addReply, getSubjects, decodeText };
