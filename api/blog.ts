import { firebaseAdmin } from "firebaseAdmin";

type DataType = {
  id: string;
  title: string;
  image_link: string;
  article: string;
};

export const getAllBlogs = async function () {
  const snapshots = await firebaseAdmin.firestore().collection("blogs").get();
  return snapshots.docs.map((doc) => {
    const id = doc.id;
    const { title, image_link, article } = doc.data();
    return { id, title, image_link, article } as DataType;
  });
};
