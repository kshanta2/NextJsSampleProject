import { Fragment } from "react";
import PostContent from "../../components/posts/post-detail/post-content";
import { getAllFiles, getPostData } from "../../lib/posts-util";
import Head from "next/head";
function PostDetailPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.posts.title}</title>
        <meta name="description" content={props.posts.excerpt} />
      </Head>
      <PostContent posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const filteredData = getPostData(slug);

  return {
    props: {
      posts: filteredData,
      slug: slug,
    },
    revalidate: 60,
  };
}

export function getStaticPaths() {
  const postFileNames = getAllFiles();
  const slugs = postFileNames.map((filename) => filename.replace(/\.md$/, ""));
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
