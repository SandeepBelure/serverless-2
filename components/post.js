import Link from 'next/link';

const Post = ({ post: { _id, text, title, createdBy, createdAt } }) => {
  return (
    <div>
      <h3>
        <Link as={`/p/${_id}`} href={`/development/post?id=${_id}`}>
          {title}
        </Link>
      </h3>
      <div> {text}</div>
      <div> {createdBy} </div>
    </div>
  );
};

export default Post;
