import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import Markdown from "~/components/shared/markdown";
import type { loader } from "~/routes/posts.$postId";
import type { Post } from "~/types";

interface Props {
  post: Post;
}

const ViewSinglePost = ({ post }: Props) => {
  const data = useLoaderData<typeof loader>();
  const goTo = useNavigate();

  return (
    <div className="ViewSinglePost">
      <h1>{post.title}</h1>
      <h2>{post.subtitle}</h2>
      <Markdown content={data.markdown} />
      <span className="ViewSinglePost__category">
        <FontAwesomeIcon icon="tag" /> {post.category}
      </span>
      <div className="ViewSinglePost__actions">
        {data.isOwner && (
          <Form method="post">
            <button name="action" type="submit" value="delete">
              Delete
            </button>
          </Form>
        )}
        <button onClick={() => goTo("/")}>Back to homepage</button>
      </div>
    </div>
  );
};

export default ViewSinglePost;
