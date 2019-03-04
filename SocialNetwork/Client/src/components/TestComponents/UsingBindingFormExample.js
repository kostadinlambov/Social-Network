import React, { Component, Fragment } from 'react';
import './App.css';
import Article, { ArticleWithWarning } from './components/Article/Article'
import RegisterForm, { RegisterFormWithWarning } from './components/RegisterForm/RegisterForm';
import Navigation, { NavigationWithWarning } from './components/Navigation/Navigation';
import withErrorHandling from './hocs/withErrorHandling';
import BindingForm from './components/BindingForm/BindingForm';

const WithErrorHandlingArticle = withErrorHandling(Article)

class App extends Component {

  onSubmit(e, data) {
    e.preventDefault();
    console.log(data);
  }

  render() {
    return (
      <Fragment>
        <BindingForm onSubmit={this.onSubmit} >
          <h1 className="title">Register Form</h1>

          <label htmlFor="username">Username:</label>
          <input type="text" name="username" placeholder="Username..." /><br/>

          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="Password..." /><br/>

          <label htmlFor="confirm-password"> Confirm Password:</label>
          <input type="password" name="confirm password" placeholder="Confirm Password..." /><br/>

          <input type="submit" value="Register" />
        </BindingForm>

        <BindingForm onSubmit={this.onSubmit} >
          <h1 className="title">Login Form</h1>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" placeholder="Username..." /><br/>

          <label htmlFor="password">Password:</label>
          <input type="password" name="password" placeholder="Password..." /><br/>
          
          <input type="submit" value="Login" />
        </BindingForm>

        < WithErrorHandlingArticle />
        {/* <Article /> */}
        <ArticleWithWarning />
        <RegisterForm />
        <RegisterFormWithWarning />
        <Navigation />
        <NavigationWithWarning />

      </Fragment>
    );
  }
}

export default App;
