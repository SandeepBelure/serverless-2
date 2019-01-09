import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import getConfig from 'next/config';

import Post from '../components/post';
const Index = ({ posts }) => (
  <div>
    <Link href={`/author`}> Create </Link>
    {posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
);

Index.getInitialProps = async ({ req }) => {
  let { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
  let baseUrl = serverRuntimeConfig.api || publicRuntimeConfig.api;
  let url = `${baseUrl}/post  `;
  const res = await fetch(url);
  const data = await res.json();
  return {
    posts: data
  };
};

export default Index;
