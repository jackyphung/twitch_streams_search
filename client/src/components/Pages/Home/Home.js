/*
Component
Home
*/
import React, { Component } from "react";
import { NavFooter, ContentArea, ContentBlock, Link } from "Layout";
import { FooterContent } from "Sections";
import TwitchLogo from 'assets/svg/Twitch_Purple_RGB.svg';
import axios from "axios";
import "./Home.css";

import { UserAuthSubscriber } from "services";

const client_id = "yy3fdkdw0g8jvhzqxnujoub0w45otv";

const helix = axios.create({
  baseURL: "https://api.twitch.tv/helix/",
  headers: { "Client-ID": client_id }
});

class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
		user_data: {},
		stream_data: {}
	};

	timer = null;

  static getDerivedStateFromProps(nextProps, prevState) {
    let state = {};
    if (prevState) {
      for (let key in nextProps) {
        if (prevState.hasOwnProperty(key)) {
          if (nextProps[key] !== prevState[key]) state[key] = nextProps[key];
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
	
	componentDidUpdate() {
		const { username } = this.props;
		if (username) {
			this.getUserData(username);
		}
	}

  getUserData = (username) => {
		helix.get("users", {
			params: {
				login: username
			}
		})
		.then((response) => {
			if (response.data['data'].length){
				console.log(response.data["data"][0]);
				this.setState({ user_data: response.data["data"][0]}, () => {
					this.getStreamData(this.state.user_data.id)
				});
			}
		});
  }

  getStreamData = (id) => {
    helix
      .get("streams", {
        params: {
          user_id: id
        }
      })
      .then((response) => {
				if (response.data["data"].length) {
					console.log(response.data["data"][0])
					this.setState({ stream_data: response.data["data"][0] });
				}
      });
  }

  render() {
		const { user_data, stream_data } = this.state;
		console.log(stream_data);
    return (
      <UserAuthSubscriber>
        {auth => (
          <ContentArea footer={false}>
            <ContentBlock
              className={`v-padding-25 streamer-block${Object.keys(user_data).length ? ` d-flex`: ``}`}
              style={{ minHeight: "calc(100vh - 48px)", textAlign: "center", background: Object.keys(user_data).length ? `black` /* `url(${user_data.offline_image_url})` */ : null }}
              size="10"
            >
              {Object.keys(user_data).length ? (
                <React.Fragment>
									<div className="user-profile twitch-dark2" style={{ flexBasis: "250px", minWidth: "250px", maxWidth: "250px", minHeight: "100%" }}>
										<Link Url={`https://twitch.tv/${user_data.login}`}>
											<div className="user-picture" style={{ backgroundImage: `url('${user_data.profile_image_url}')` }}/>
										</Link>
										<div className="user-info padding-10">
											<Link Url={`https://twitch.tv/${user_data.login}`}><h1>{user_data.display_name}</h1></Link>
											<div className="description">
												{user_data.description}
											</div>
											<div className="view-count">
												<span>Viewers</span><br/>
												{user_data.view_count}
											</div>
											{ Object.keys(stream_data).length ?
												<div className="stream-info">
                          <div className="title">
                            <span>Title</span>
                            <br/>{stream_data.title}
                          </div>
                          <div className="status">
                            <span>Status</span>
                            <br/>{stream_data.type}
                          </div>
													<div className="current-viewers">
														<span>Currently Viewing</span>
														<br/>{stream_data.viewer_count}
													</div>
												</div>
												: null
											}
										</div>
									</div>
									<div className="stream-video-player w-grow">
										<iframe
											style={{ minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%" }}
											src={`https://player.twitch.tv/?channel=${user_data.login}`}
											frameborder="<frameborder>"
											scrolling="<scrolling>"
											allowfullscreen>
										</iframe>
									</div>
								</React.Fragment>
              ) : (
                <React.Fragment>
                  <h1 style={{ fontWeight: "normal" }}>
                    Welcome visitor! You may wonder what to do with this
                    application...
                  </h1>
                  <h2 style={{ fontWeight: "normal" }}>
                    This application serves a purpose to search for any Twitch
                    Streamer and see their details
                  </h2>
                  <TwitchLogo className="logo-animate" style={{ maxWidth: "600px", height: "auto" }} />
                </React.Fragment>
              )}
            </ContentBlock>
          </ContentArea>
        )}
      </UserAuthSubscriber>
    );
  }
}

export { Home };
