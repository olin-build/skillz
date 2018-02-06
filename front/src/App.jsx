import React, { Component } from 'react';

import { Rating } from './Rating';
import { EditPersonContainer } from './EditPerson';
import { PersonSkillsTableContainer } from './PersonSkillsTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { person: null };
  }
  selectPerson(person) {
    this.setState({ person: person === this.state.person ? null : person });
  }
  render() {
    const { person } = this.state;
    return (
      <div>
        <a
          id="github-icon"
          href="https://github.com/olin-build/skillz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="huge github icon" />
        </a>
        <div className="ui container">
          <h1 className="ui dividing header">People Skillz Finder</h1>
          <div className="ui message">
            <Instructions />
            <Legend />
          </div>
          <PersonSkillsTableContainer
            className="column"
            editablePerson={person}
            onRowClick={p => this.selectPerson(p)}
          />
          {person && <EditPersonContainer person={person} />}
        </div>
      </div>
    );
  }
}

const Instructions = () => (
  <div>
    <p>
      Use this tool to find people who know or want to learn X.
    </p>
    <p>
      Click on your row to edit your skills and interests.
      (Please only edit yourself or with permission!)
    </p>
  </div>);


const Legend = () => (
  <table>
    <tbody>
      <tr>
        <td><Rating rating={1} className="inline" /></td>
        <td>minimal experience</td>
        <td><Rating rating={1} className="inline" icon="student" /></td>
        <td>minimal interest</td>
      </tr>
      <tr>
        <td><Rating rating={5} className="inline" /></td>
        <td>very experienced</td>
        <td><Rating rating={5} className="inline" icon="student" /></td>
        <td>really wants to learn</td>
      </tr>
      <tr>
        <td><Rating rating={0} className="inline" /></td>
        <td>doesn’t know</td>
        <td><Rating rating={0} className="inline" /></td>
        <td>not interested</td>
      </tr>
    </tbody>
  </table>);


export default App;
