import React, {Component} from 'react';
import {render as renderDOM} from 'react-dom';
import MaskedInput from 'react-text-mask';
import {masks} from './constants';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			form: {},
			pastedImage: null,
		};

		this.pasteHandler = this.pasteHandler.bind(this);
		this.send = this.send.bind(this);
		this.removeImage = this.removeImage.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
	}

	componentWillMount() {
		window.addEventListener('keydown', e => {
			if(e.ctrlKey||e.metaKey){
				switch(e.keyCode) {
					case 13:
						this.showModal();
						break;
					case 86:
						document.execCommand("paste");
						break;
				}
			}
		});
		window.addEventListener("paste", this.pasteHandler);
	}

	pasteHandler(e) {
		if(e.clipboardData) {
			let items = e.clipboardData.items;
			if(items) {
				for(let i = 0; i < items.length; i++) {
					if(items[i].type.indexOf("image") !== -1) {
						let blob = items[i].getAsFile(),
							URLObj = window.URL || window.webkitURL,
							source = URLObj.createObjectURL(blob),
							form = this.state.form,
							pastedImage = new Image();
						form.avatar = blob;
						pastedImage.onload = () => this.setState({pastedImage, form});
						pastedImage.src = source;
						document.getElementById('avatar').value = '';
					}
				}
			}
		}
	}

	removeImage(e) {
		e.preventDefault();
		document.getElementById('avatar').value = '';
		let form = {
			name: this.state.form.name,
			email: this.state.form.email
		};
		this.setState({pastedImage: null, form: form});
	}

	handleChange(e) {
		let form = this.state.form;
		form[e.target.id] = e.target.value;
		this.setState({form})
	}

	handleFileChange(e) {
		let form = this.state.form,
			pastedImage = new Image(),
			URLObj = window.URL || window.webkitURL;
		if(e.target.files.length) {
			form[e.target.id] = e.target.files[0];
			pastedImage.onload = () => this.setState({pastedImage, form});
			pastedImage.src = URLObj.createObjectURL(e.target.files[0]);
		}
	}

	send(e) {
		e.preventDefault();
		const form = this.state.form;
		let formData = new FormData();
		formData.append('name', form.name);
		formData.append('bdate', form.bdate);
		formData.append('avatar', form.avatar);

		let xhr = new XMLHttpRequest();
		xhr.open('POST','/addUser');
		xhr.send(formData);
	}

	render() {
		return (
			<div id="wrapper">
				<div id="main">
					<div className="inner">
						<p className="text03">Добавить именинника</p>
						<form action="/" style={{textAlign: 'left'}}>
							<div className="two-cols">
								<div className="col">
									<div className="form-group">
										<label htmlFor="name" className="text03">ФИО</label>
										<input id="name" type="text" className="text" onChange={this.handleChange} value={this.state.form.name||''}/>
									</div>
									<div className="form-group">
										<label htmlFor="bdate" className="text03">Дата рождения</label>
										<MaskedInput mask={masks.DATE} id="bdate" type="text" className="text" onChange={this.handleChange} value={this.state.form.bdate||''}/>
									</div>
									<div className="form-group">
										<button className="btn btn-primary" onClick={this.send}>Добавить</button>
									</div>
								</div>
								<div className="col">
										{this.state.pastedImage ? (
										<div className="screenshot-wrapper">
											<div>
												<img src={this.state.pastedImage.src}/>
												<button className="btn btn-danger closeBtn" onClick={this.removeImage}>&times;</button>
											</div>
										</div>)
											: (
												<div className="screenshot-wrapper">
													<label htmlFor="avatar">
														<div className="photo">Прикрепить фото</div>
													</label>
												</div>
											)}
									<input type="file" id="avatar" name="avatar" onChange={this.handleFileChange} style={{display: 'none'}}/>
								</div>
							</div>
						</form>
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