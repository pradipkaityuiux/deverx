import { doc, setDoc, updateDoc } from "firebase/firestore"; 
import { db } from "../../firebaseConfig";

export const submitFormData = async (formData) => {
  return await setDoc(doc(db, "blogs", formData.id), {
    ...formData
  });
};

export const updateUserBlogs = async(allBlogs) =>{
    const updateCurrentUser = doc(db, "users", allBlogs.userId);
    await updateDoc(updateCurrentUser, {
      allBlogs: [...allBlogs.allBlogs, allBlogs.blogId]
    });
}