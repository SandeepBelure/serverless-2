import Link from 'next/link';
import styled from 'styled-components';

const Post = ({ post: { _id, text, title, createdBy, createdAt } }) => {
  return (
    <div>
      <h3>
        <Link as={`development/p/${_id}`} href={`/development/post?id=${_id}`}>
          <Title> {title} </Title>
        </Link>
      </h3>
      <div> {text}</div>
      <div> {createdBy} </div>
    </div>
  );
};

const Title = styled.h1`
  color: blue;
`;

export default Post;
