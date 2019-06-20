import React, {Component} from 'react';
import './logIn.less';

class LogIn extends Component {

    state = {
        email: '',
        password: '',
    };

    handleChange = event => {

        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit(event) {
        console.log('A form was submitted: ' + this.state.email + this.state.password);
        event.preventDefault();
    }

    render() {
        return (
            <div className="popup-login">
                Для просмотра профиля необходимо авторизоваться.
                <div className="popup-login__body">
                    <div className="popup-logo">
                        <img src="../img/mm_logo.svg" alt=""/>
                    </div>
                    <div className="popup-form">
                        <form
                            onSubmit={this.handleSubmit}>
                            <label htmlFor="email">E-mail:</label>
                            <input type="email"
                                   className="popup-form__email"
                                   name="email"
                                   placeholder="Email Address"
                                   value={this.state.email}
                                   onChange={this.handleChange}
                                   required/>
                            <label htmlFor="password">Пароль</label>
                            <input type="password"
                                   className="popup-form__password"
                                   name="password"
                                   placeholder="Password"
                                   value={this.state.password}
                                   onChange={this.handleChange}
                                   required/>
                            <input type="submit"
                                   className="popup-form__submit"
                                   value="Войти"/>
                        </form>
                        <button className="popup-login__restore">Забыли пароль?</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogIn;