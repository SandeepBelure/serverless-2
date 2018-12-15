import fetch from 'isomorphic-unfetch';
import React from 'react';
import styled from 'styled-components';
import { Button } from 'rebass';
import Router from 'next/router';
import getConfig from 'next/config';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';

class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    if (typeof window !== 'undefined') this.ReactQuill = require('react-quill');
  }
  submit = async () => {
    let { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    let baseUrl = serverRuntimeConfig.api || publicRuntimeConfig.api;
    let title = document.getElementById('title').value;
    let { text } = this.state;
    console.log('text is', text);

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

  handleChange = value => {
    this.setState({ text: value });
  };
  render() {
    let editor;
    const ReactQuill = this.ReactQuill;
    if (ReactQuill) {
      return (
        <Wrapper>
          <div>
            <Title type='text' id='title' />
          </div>
          <div>
            <ReactQuill
              theme='snow'
              value={this.state.text}
              onChange={this.handleChange}
            />
          </div>
          <Creator type='text' id='author' />
          <Submit bg='magenta' onClick={this.submit}>
            Submit
          </Submit>
        </Wrapper>
      );
    } else {
      return <div> rendering </div>;
    }
  }
}

let Title = styled.input`
  height: 40px;
  width: 75%;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 3px;
  border: 1px solid #ff0000;
  align: center;
`;

const Content = styled.textarea`
  width: 75%;
  height: 400px;
`;

const Creator = styled.input`
  height: 28px;
  width: 200px;
  border-radius: 5px;
  border: 1px solid #ff1aee;
`;

const Submit = styled(Button)`
  margin-left: 40%;
`;

const Wrapper = styled.div`
  margin: 15px;
`;
export default Author;
