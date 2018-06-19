import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Auxilary';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[App.js] Inside Consturctor', props);
    this.state = {
      persons: [
        { id: 1, name: 'The Red Ranger', age: 24}, 
        { id: 2, name: 'The Blue Ranger', age: 19},
        { id: 3, name: 'The black Ranger', age: 18},
        { id: 4, name: 'The Yellow Ranger', age: 20},
        { id: 5, name: 'The Pink Ranger', age: 19}
      ],
      otherState: 'some other value',
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    };
  }

  componentWillMount() {
    console.log('[App.js] Inside componentWillMount');
  }
  componentDidMount() {
    console.log('[App.js] Inside componentDidMount');
  }
 /*  shouldComponentUpdate( nextProps, nextState) {
    console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
    return nextState.persons !== this.state.persons || 
      nextState.showPersons !== this.state.showPersons;
  } */

  componentWillUpdate( nextProps, nextState) {
      console.log('[UPDATE App.js] Inside componentWillUpdate', 
      nextProps, 
      nextState
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
      console.log('[UPDATE App.js] Inside getDerivedStateFromProps', 
      nextProps, 
      prevState
    );

    return prevState;
  }

  getSnapshotBeforeUpdate() {
      console.log('[UPDATE App.js] Inside getSnapshotBeforeUpdate');
  }
  componentDidUpdate() {
      console.log('[UPDATE App.js] Inside componentDidUpdate');
  }

  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons.slice();
    // const persons = [...this.state.persons]; spread operator can be use to mainstate state immutability.
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }
  nameChangeHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]) alternative.

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( (prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      } 
    });
  }

  loginHandler = () => {
    this.setState( {authenticated: true} );
  }

  render() {
    
    console.log('[App.js] Inside Render');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}/>
    }
    
    return (
      <Aux>
          <button onClick={ () => {this.setState( {showPersons: true} )} }>Show Persons</button>
          <Cockpit 
            appTitle={this.props.title}
            showPersons={this.state.showPersons} 
            persons={this.state.persons}
            login={this.loginHandler}
            clicked={this.togglePersonsHandler}/>
            <AuthContext.Provider value={this.state.authenticated}>
              {persons}
            </AuthContext.Provider>
        </Aux>
    );

    /* Below is how the code above is translated to */
    /* return React.createElement('div', {className: 'App'}, React.createElement('h1', null, "Hello Mello again!")); */
  }
}

export default withClass(App, classes.App);
