/*
Component
Home
*/
import React, { Component } from 'react';
import { NavFooter, ContentArea, ContentBlock } from 'Layout';
import { FooterContent } from 'Sections';
import './Home.css';

import { UserAuthSubscriber } from 'services';

class Home extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
    let page = "Search A Streamer!";
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
			<UserAuthSubscriber>
				{ auth => (
					<ContentArea FooterContent={<FooterContent/>}>

					</ContentArea>
				)}
			</UserAuthSubscriber>
		);
	}

}

export { Home };