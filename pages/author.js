import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import getConfig from 'next/config';

const Author = () => {
  const submit = async () => {
    let { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    let baseUrl = serverRuntimeConfig.api || publicRuntimeConfig.api;
    let title = document.getElementById('title').value;
    let text = document.getElementById('textArea').value;
    let createdBy = document.getElementById('author').value;

    await fetch(`${baseUrl}/post`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        text,
        createdBy
      })
    });

    Router.push('/');
  };

  return (
    <div>
      <input type='text' id='title' />
      <textArea id='textArea' />
      <input type='text' id='author' />
      <button type='text' onClick={submit}>
        Submit
      </button>
    </div>
  );
};

export default Author;
