import React, {Component} from 'react';
import {render as renderDOM} from 'react-dom';
import moment from 'moment';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: []
		};

		this.deleteUser = this.deleteUser.bind(this);
	}

	componentWillMount() {
		let xhr = new XMLHttpRequest();
		xhr.open('GET','/listUsers');
		xhr.responseType = 'json';
		xhr.onreadystatechange = () => {
			if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				this.setState({users: xhr.response});
			}
		};
		xhr.send();
	}

	deleteUser(user, e) {
		e.preventDefault();
		if(confirm(`Удалить из списка сотрудника «${user.name}»?`)) {
			let xhr = new XMLHttpRequest();
			xhr.open('POST','/deleteUser');
			xhr.responseType = 'json';
			xhr.onreadystatechange = () => {
				if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
					this.setState({users: xhr.response});
				}
			};
			let formData = new FormData();
			formData.append('id', user.id);
			xhr.onreadystatechange = () => {
				if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
					if(xhr.response) {
						let users = this.state.users;
						users = users.filter(item => item.id !== user.id);
						this.setState({users: users});
					}
					else {
						alert('Не удалось удалить сотрудника из списка.')
					}
				}
			};
			xhr.send(formData);
		}
	}

	render() {
		return (
			<div id="wrapper">
				<div id="main">
					<div className="inner">
						<p className="text03">Список сотрудников:</p>
						<table className="table">
							<thead>
							<tr>
								<th/>
								<th>ФИО</th>
								<th>Дата рождения</th>
								<th/>
							</tr>
							</thead>
							<tbody>
							{
								this.state.users.map((user, i) => (
									<tr key={i}>
										<td style={{textAlign: 'center'}}>{i+1}</td>
										<td>{user.name}</td>
										<td>{moment(user.bdate, 'YYYY-MM-DD', true).format('DD.MM.YYYY')}</td>
										<td style={{textAlign: 'right'}}>
											<a href="#" className="deleteUser" onClick={this.deleteUser.bind(null, user)}>&times;</a>
										</td>
									</tr>
								))
							}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

renderDOM(
	<App/>,
	document.getElementById('app')
);