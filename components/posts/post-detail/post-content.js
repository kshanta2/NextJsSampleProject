import classes from "./post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

function PostContent(props) {
  const { posts } = props;
  const imagePath = `/images/posts/${posts.slug}/${posts.image}`;

  const MarkdownComponents = {
    /*img(image) {
      return (
        <Image
          src={`/images/posts/${posts.slug}/${image.src}`}
          alt={image.alt}
          height="300"
          width="600"
        />
      );
    },*/
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        const alt = image.properties.alt;
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${posts.slug}/${image.properties.src}`}
              alt={alt}
              height="300"
              width="600"
            />
          </div>
        );
      } else return <p>{paragraph.children}</p>;
    },

    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={posts.title} image={imagePath}></PostHeader>
      <ReactMarkdown components={MarkdownComponents}>
        {posts.content}
      </ReactMarkdown>
    </article>
  );
}

export default PostContent;
