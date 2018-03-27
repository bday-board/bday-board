import React, {Component} from 'react';
import {render as renderDOM} from 'react-dom';
import OwlCarousel from 'react-owl-carousel3';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: []
		}
	}

	componentWillMount() {
		let xhr = new XMLHttpRequest();
		xhr.open('GET','/getUsers');
		xhr.responseType = 'json';
		xhr.onreadystatechange = () => {
			if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				this.setState({users: xhr.response});
			}
		};
		xhr.send();
	}

	componentDidMount() {
		let bgdrs = [
			'/bgrds/bg1.jpg',
			'/bgrds/bg2.jpg',
			'/bgrds/bg3.jpg',
			'/bgrds/bg4.jpg',
		], i = 0;
		document.getElementById('wrapper').style.backgroundImage = `url('${bgdrs[i]}')`;

		setInterval(() => {
			i++;
			if(i>=bgdrs.length) i = 0;
			document.getElementById('wrapper').style.backgroundImage = `url('${bgdrs[i]}')`;
		}, 5000);
	}

	render() {
		let options = {
			autoplay: true,
			autoplayTimeout: 5000,
			autoWidth: true,
			mouseDrag: true,
			center: true,
			items: 2,
			margin: 40,
			dots: false,
			loop: true,
			nav: false,
			startPosition: Math.floor(this.state.users.length / 2)
		};
		return (
			<div id="wrapper">
				{this.state.users.length &&
					<OwlCarousel ref={'users'} className="owl-theme"
						{...options}
					>
						{this.state.users.map((user, i) => (
							<div id="main" className="carousel-item" key={`user-${user.id}`} style={{width: '560px'}}
								onClick={() => this.refs.users.to(i, 300)}
							>
								<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink={"http://www.w3.org/1999/xlink"} viewBox="0 0 40 40" display="none"
									width="0" height="0">
									<symbol id="icon-906" viewBox="0 0 40 40">
										<path d="M27.2,4.7v4.9h-2.9c-1.1,0-1.8,0.2-2.1,0.6c-0.4,0.5-0.6,1.1-0.6,2v3.5H27l-0.7,5.4h-4.7v14H16v-14h-4.7v-5.4H16v-4.1 c0-2.3,0.6-4.1,1.9-5.3s2.9-1.9,5.2-1.9C24.8,4.4,26.2,4.5,27.2,4.7L27.2,4.7z"/>
									</symbol>
									<symbol id="icon-910" viewBox="0 0 40 40">
										<path d="M20,7c4.2,0,4.7,0,6.3,0.1c1.5,0.1,2.3,0.3,3,0.5C30,8,30.5,8.3,31.1,8.9c0.5,0.5,0.9,1.1,1.2,1.8c0.2,0.5,0.5,1.4,0.5,3 C33,15.3,33,15.8,33,20s0,4.7-0.1,6.3c-0.1,1.5-0.3,2.3-0.5,3c-0.3,0.7-0.6,1.2-1.2,1.8c-0.5,0.5-1.1,0.9-1.8,1.2 c-0.5,0.2-1.4,0.5-3,0.5C24.7,33,24.2,33,20,33s-4.7,0-6.3-0.1c-1.5-0.1-2.3-0.3-3-0.5C10,32,9.5,31.7,8.9,31.1 C8.4,30.6,8,30,7.7,29.3c-0.2-0.5-0.5-1.4-0.5-3C7,24.7,7,24.2,7,20s0-4.7,0.1-6.3c0.1-1.5,0.3-2.3,0.5-3C8,10,8.3,9.5,8.9,8.9 C9.4,8.4,10,8,10.7,7.7c0.5-0.2,1.4-0.5,3-0.5C15.3,7.1,15.8,7,20,7z M20,4.3c-4.3,0-4.8,0-6.5,0.1c-1.6,0-2.8,0.3-3.8,0.7 C8.7,5.5,7.8,6,6.9,6.9C6,7.8,5.5,8.7,5.1,9.7c-0.4,1-0.6,2.1-0.7,3.8c-0.1,1.7-0.1,2.2-0.1,6.5s0,4.8,0.1,6.5 c0,1.6,0.3,2.8,0.7,3.8c0.4,1,0.9,1.9,1.8,2.8c0.9,0.9,1.7,1.4,2.8,1.8c1,0.4,2.1,0.6,3.8,0.7c1.6,0.1,2.2,0.1,6.5,0.1 s4.8,0,6.5-0.1c1.6-0.1,2.9-0.3,3.8-0.7c1-0.4,1.9-0.9,2.8-1.8c0.9-0.9,1.4-1.7,1.8-2.8c0.4-1,0.6-2.1,0.7-3.8 c0.1-1.6,0.1-2.2,0.1-6.5s0-4.8-0.1-6.5c-0.1-1.6-0.3-2.9-0.7-3.8c-0.4-1-0.9-1.9-1.8-2.8c-0.9-0.9-1.7-1.4-2.8-1.8 c-1-0.4-2.1-0.6-3.8-0.7C24.8,4.3,24.3,4.3,20,4.3L20,4.3L20,4.3z"/>
										<path d="M20,11.9c-4.5,0-8.1,3.7-8.1,8.1s3.7,8.1,8.1,8.1s8.1-3.7,8.1-8.1S24.5,11.9,20,11.9z M20,25.2c-2.9,0-5.2-2.3-5.2-5.2 s2.3-5.2,5.2-5.2s5.2,2.3,5.2,5.2S22.9,25.2,20,25.2z"/>
										<path d="M30.6,11.6c0,1-0.8,1.9-1.9,1.9c-1,0-1.9-0.8-1.9-1.9s0.8-1.9,1.9-1.9C29.8,9.7,30.6,10.5,30.6,11.6z"/>
									</symbol>
									<symbol id="icon-905" viewBox="0 0 40 40">
										<path
											d="M36.3,10.2c-1,1.3-2.1,2.5-3.4,3.5c0,0.2,0,0.4,0,1c0,1.7-0.2,3.6-0.9,5.3c-0.6,1.7-1.2,3.5-2.4,5.1 c-1.1,1.5-2.3,3.1-3.7,4.3c-1.4,1.2-3.3,2.3-5.3,3c-2.1,0.8-4.2,1.2-6.6,1.2c-3.6,0-7-1-10.2-3c0.4,0,1.1,0.1,1.5,0.1 c3.1,0,5.9-1,8.2-2.9c-1.4,0-2.7-0.4-3.8-1.3c-1.2-1-1.9-2-2.2-3.3c0.4,0.1,1,0.1,1.2,0.1c0.6,0,1.2-0.1,1.7-0.2 c-1.4-0.3-2.7-1.1-3.7-2.3s-1.4-2.6-1.4-4.2v-0.1c1,0.6,2,0.9,3,0.9c-1-0.6-1.5-1.3-2.2-2.4c-0.6-1-0.9-2.1-0.9-3.3s0.3-2.3,1-3.4 c1.5,2.1,3.6,3.6,6,4.9s4.9,2,7.6,2.1c-0.1-0.6-0.1-1.1-0.1-1.4c0-1.8,0.8-3.5,2-4.7c1.2-1.2,2.9-2,4.7-2c2,0,3.6,0.8,4.8,2.1 c1.4-0.3,2.9-0.9,4.2-1.5c-0.4,1.5-1.4,2.7-2.9,3.6C33.8,11.2,35.1,10.9,36.3,10.2L36.3,10.2z"/>
									</symbol>
								</svg>
								<div className="inner">
									<p id="text02">С днём рождения!</p><hr id="divider01"/>
									<div className="avatar-image">
										<img src={user.avatar || '/avatars/no-avatar.png'}/>
									</div>
									<h1 id="text01">{user.name}</h1>
									<hr id="divider01"/>
									<div id="text-wrapper">
										<p className="text03">
											Желаю в жизни только света,<br/>
											Тепла, успехов и любви.<br/>
											В душе чтоб было вечным лето,<br/>
											Чтоб звезды в путь тебя вели.<br/>
										</p>
										<p className="text03">
											Лишь радости, в делах — удачи,<br/>
											Свершений новых и побед.<br/>
											И только так — никак иначе.<br/>
											Счастливых, ярких, долгих лет!
										</p>
									</div>
								</div>
							</div>
						))}
					</OwlCarousel>
				}
			</div>
		);
	}
}

renderDOM(
	<App/>,
	document.getElementById('app')
);