/*
Component
Home
*/
import React, { Component } from 'react';
import { NavFooter, ContentArea, ContentBlock } from 'Layout';
import { FooterContent } from 'Sections';
import './Home.css';
import axios from 'axios'

import { UserAuthSubscriber } from 'services';

const client_id = 'yy3fdkdw0g8jvhzqxnujoub0w45otv';

const helix = axios.create({
	baseURL: 'https://api.twitch.tv/helix/',
	headers: {'Client-ID': client_id}
});

class Home extends Component {

	constructor(props) {
		super(props);
	}

	state = {  
		
	}

	static getDerivedStateFromProps(nextProps, prevState) {
    let state = { };
    if (prevState) {
      for (let key in nextProps) {
        if (prevState.hasOwnProperty(key)) {
          if (nextProps[key] !== prevState[key])
            state[key] = nextProps[key];
        }
      }
    }
    
    return state;
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

	getUserData() {
		this.helix.get('users').then(function (response) {
			this.setState({user_data: response.data})
		});
	}

	getStreamData() {
		this.helix.get('streams').then(function (response) {
			this.setState({user_data: response.data})
		});
	}

	render() {
		return (
			<UserAuthSubscriber>
				{ auth => (
					<ContentArea FooterContent={<FooterContent/>}>
						<ContentBlock size="10">

						</ContentBlock>
					</ContentArea>
				)}
			</UserAuthSubscriber>
		);
	}

}

export { Home };