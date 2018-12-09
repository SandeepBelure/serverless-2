import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';

const Post = ({ post: { title, text } }) => (
  <div>
    <h3> {title}</h3>
    <div> {text}</div>
  </div>
);

Post.getInitialProps = async ({ req, query: { id } }) => {
  let { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
  console.log('config', getConfig());
  let baseUrl = serverRuntimeConfig.api || publicRuntimeConfig.api;
  let url = `${baseUrl}/post/${id}`;
  let res = await fetch(url);
  const data = await res.json();

  return {
    post: data
  };
};
export default Post;
