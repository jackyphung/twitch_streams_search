/*
Component
Home
*/
import React, { Component } from 'react';
import { NavFooter, ContentArea, ContentBlock } from 'Layout';
import { FooterContent } from 'Sections';
//import TwitchLogo from 'assets/svg/Twitch_Purple_RGB.svg';
import axios from 'axios';
import './Home.css';

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

	getUserData(e) {
		helix.get('users', {
			params: {
				login: e.target.value
			}
		}).then(function (response) {
			this.setState({user_data: response.data["data"][0]})
		});
	}

	getStreamData() {
		helix.get('streams', {
			params: {
				user_id : this.state.user_data
			}
		}).then(function (response) {
			this.setState({stream_data: response.data["data"][0]})
		});
	}

	render() {
		return (
			<UserAuthSubscriber>
				{ auth => (
					<ContentArea FooterContent={<FooterContent/>}>
						<ContentBlock className="v-padding-25" style={{ minHeight: "calc(100vh - 96px)", textAlign: "center" }} size="10">
							<input type="text" placeholder="Search Twitch Streamer" />
							{ Object.keys(this.state).length ?
								<React.Fragment>
									
								</React.Fragment>
								:
								<React.Fragment>
									<h1 style={{ fontWeight: "normal" }}>
										Welcome visitor! You may wonder what to do with this application...
									</h1>
									<h2 style={{ fontWeight: "normal" }}>
										This application serves a purpose to search for any Twitch Streamer and see their details
									</h2>
									{/* <TwitchLogo /> */}
								</React.Fragment>
							}
						</ContentBlock>
					</ContentArea>
				)}
			</UserAuthSubscriber>
		);
	}

}

export { Home };