import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import {
  Container,
  Button,
  Heading,
  Grid,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import nookies from "nookies";

import { firebaseAdmin } from "firebaseAdmin";
import { firebase } from "firebaseClient";
import { AuthContext } from "HOC/AuthProvider";
import PrivateRoute from "HOC/PrivateRoute";
import Header from "components/Header";
import { getAllBlogs } from "api/blog";
import BlogCard from "components/BlogCard";

type BlogType = {
  id: string;
  title: string;
  image_link: string;
  article: string;
};

type BlogsType = BlogType[];

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    // the user is authenticated!
    const { uid, email } = token;
    const blogs = await getAllBlogs();
    return {
      props: {
        blogs,
      },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    ctx.res.writeHead(302, { Location: "/login" });
    ctx.res.end();

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return { props: {} as never };
  }
}

const App = ({ blogs }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user, setUser } = useContext(AuthContext);
  const [blogList, setBlogList] = useState<BlogsType>(blogs);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [chosenBlog, setChosenBlog] = useState<BlogType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("blogs")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const id = doc.id;
          const { title, image_link, article } = doc.data();
          return { id, title, image_link, article };
        });
        setBlogList(data);
      });
    return unsubscribe;
  }, []);

  const handleClickSignOut = (event: React.MouseEvent): void => {
    event.preventDefault();
    firebase.auth().signOut();
    router.push("/login");
  };
  const handleClickBlogCard = (event: React.MouseEvent): void => {
    event.preventDefault();
    const id = event.currentTarget.getAttribute("data-id");
    const chosenBlog = blogList.find((blog) => blog.id === id);
    setChosenBlog(chosenBlog);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setChosenBlog(null);
  };

  return (
    <PrivateRoute>
      <Header>
        <Heading color="white" as="h2" fontSize="1.4rem">
          Hello {user?.email}
        </Heading>
        <Button cursor="pointer" colorScheme="linkedin" variant="solid" onClick={handleClickSignOut}>
          Sign out
        </Button>
      </Header>
      <Container maxW="1200px" h="100vh" pt="32px">
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {blogList.map((blog) => (
            <Box w="100%" h="260px" cursor="pointer" data-id={blog.id} onClick={handleClickBlogCard}>
              <BlogCard title={blog.title} imageLink={blog.image_link} />
            </Box>
          ))}
        </Grid>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{chosenBlog?.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{chosenBlog?.article}</ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </PrivateRoute>
  );
};

export default App;
