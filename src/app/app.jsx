import React, {Component} from 'react';
import {render as renderDOM} from 'react-dom';
import 'owl.carousel';
import {congratulations} from '../../поздравления';
import {backgrounds} from '../../фоны';
import moment from 'moment';

moment.locale('ru');

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: []
		};

		this.owl = null;
	}

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	componentWillMount() {
		let xhr = new XMLHttpRequest();
		xhr.open('GET','/getUsers');
		xhr.responseType = 'json';
		xhr.onreadystatechange = () => {
			if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				this.setState({users: xhr.response}, () => {
					let options = {
						autoplay: true,
						autoplayTimeout: 5000,
						mouseDrag: true,
						center: true,
						items: 3,
						margin: 40,
						dots: false,
						loop: true,
						nav: false,
						startPosition: Math.floor(this.state.users.length / 2)
					};
					let owl = $('#owl-carousel');
					owl.owlCarousel(options);
					owl.on('wheel', e => {
						e.preventDefault();
						e = e.originalEvent;
						let delta = e.deltaY || e.detail || e.wheelDelta;
						if(delta > 0) owl.trigger('next.owl.carousel', [300]);
						else owl.trigger('prev.owl.carousel', [300]);
					});

					this.owl = owl;
				});
			}
		};
		xhr.send();
	}

	componentDidMount() {
		document.getElementById('wrapper').style.backgroundImage = `url('/bgrds/${backgrounds[this.getRandomInt(0, backgrounds.length - 1)]}')`;

		setInterval(() => {
			document.getElementById('wrapper').style.backgroundImage = `url('/bgrds/${backgrounds[this.getRandomInt(0, backgrounds.length - 1)]}')`;
		}, 5000);
	}

	render() {
		return (
			<div id="wrapper">
				<div id="owl-carousel" className="owl-carousel owl-theme">
					{this.state.users.map((user, i) => {
						let header = null, congrBlock = null,
							userBDay = moment(user.bdate, 'YYYY-MM-DD', true).year(0),
							today = moment().year(0);

						if(userBDay.isAfter(today, 'day')) {
							header = <p id="text02">Скоро день рождения</p>;
							congrBlock = moment(user.bdate, 'YYYY-MM-DD', true).format('D MMMM');
						}
						else {
							if(userBDay.isBefore(today, 'day')) {
								header = <p id="text02">Недавно был день рождения</p>;
								congrBlock = congratulations[this.getRandomInt(0, congratulations.length - 1)];
							}
							else {
								header = <p id="text02">Сегодня день рождения!</p>;
								congrBlock = congratulations[this.getRandomInt(0, congratulations.length - 1)];
							}
						}

						return (
							<div id="main" key={`user-${user.id}`} style={{width: '560px'}} onClick={() => {
								if(this.owl) {
									this.owl.trigger('to.owl.carousel', [i, 300]);
								}
							}}>
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
									{header}
									<hr id="divider01"/>
									<div className="avatar-image" style={{backgroundImage: `url(${user.avatar || '/avatars/no-avatar.png'})`}}/>
									<h1 id="text01">{user.name}</h1>
									<hr id="divider01"/>
									<div id="text-wrapper">
										{congrBlock}
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		);
	}
}

renderDOM(
	<App/>,
	document.getElementById('app')
);