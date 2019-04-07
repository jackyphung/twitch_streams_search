/*
Component
NotFound
*/
import React, { Component } from 'react';
import { ContentArea, Link } from 'Layout';
import css from './NotFound.css';

class NotFound extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
    let page = "Page Not Found";
    if (document.title.includes(" | ")) {
      let title = document.title.split(" | ");
      title[title.length - 1] = page;
      document.title = title.join(" | ");
    } else {
      document.title = `${document.title} | ${page}`;
    }
	}

	render() {
		return (
			<ContentArea footer={false}>
        <div className="center-absolute">
					<img src="https://cdn.discordapp.com/attachments/130109306740670464/508105235869466626/transparent-emojis-dead-4.png"
						style={{ display: "block", margin: "0 auto", maxWidth: "100%" }} />
          <h1>The page you are accessing is not found.</h1>
          <h2><Link Url="/">Return to our homepage</Link></h2>
        </div>
      </ContentArea>
		);
	}

}

export { NotFound }