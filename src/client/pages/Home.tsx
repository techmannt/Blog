import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
var moment = require('moment');

class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      loaded: false,
      chirpInfo: [],
      title: '',
      message: '',
      tag: '',
      selectedUserId: '0',
      users: [],
      tags: [],
    };
  }

  async componentDidMount() {
    let tagData = await fetch(`/api/tags`);
    let tagInfo = await tagData.json();

    let res2 = await fetch('/api/users');
    let chirpInfo = await res2.json();
    console.log(chirpInfo);
    this.setState({
      loaded: true,
      chirpInfo,
      tags: tagInfo
    });
  }

  async handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    let newBody = {
      tag: this.state.tag,
      title: this.state.title,
      message: this.state.message
    };
    try {
      let chirpData = await fetch(`/api/chirps/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBody)

      });
      if (chirpData.ok) {
        let chirpData = await fetch('/api/chirps');
        let chirpInfo = await chirpData.json();
        this.setState({ chirpInfo, title: '', message: '' });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleChirpTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ title: e.target.value });
  }

  handleChirpMessageChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ message: e.target.value });
  }

  render() {
    if (this.state.loaded) {
      return (
        <main className="container py-5">
          <div className="row">
            {this.state.chirpInfo.map(entry => (
              <div className="col-md-4" key={entry.id}>
                <div className="card">
                  <img src="https://i.ibb.co/rG6jhns/starwars.jpg" alt="theme"></img>
                  <div className="card-body">
                    <h5 className="card-title">{entry.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{moment(entry.created).format("MMM. DD, YYYY")}</h6>
                    <p className="card-text">{entry.name}</p>
                    <Link className="card-link btn btn-primary" to={`/${entry.id}`}>View Blog</Link>
                  </div>
                </div>
              </div>

            ))}

            <form className="col-12 form-group p-3 shadow">
              <input className="form-control shadow" type="text" name="title" value={this.state.title} onChange={(event) => this.handleChirpTitleChange(event)} placeholder="Enter title" />
              <input className="form-control shadow" type="text" name="message" value={this.state.message} onChange={(event) => this.handleChirpMessageChange(event)} placeholder="Enter blog post" />

              <label>Tag:</label>
              <select
                value={this.state.selectedUserId}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ tag: e.target.value })}
                className="form-control">
                <option value="0">Select...</option>
                {this.state.tags.map(tag => (
                  <option key={tag.id} value={tag.name}>{tag.name}</option>
                ))}
              </select>

              <button className="btn btn-primary" onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.handleAdd(e)}>Submit it!</button>
            </form>
          </div>
        </main>
      );
    } else {
      return <h6>Please wait!</h6>;
    }
  }
}

export interface IHomeProps extends RouteComponentProps<{ id: string }> { }

interface chirpObject {
  name: string;
  message: string;
  id: number;
  title: string;
  content: string;
  created: string;
  tagid: number;
}

interface IUsers {
  userid: number;
  name: string;
  email: string;
  created_at: Date;
}

interface ITags {
  name: string;
  id: string;
}

export interface IHomeState {
  loaded: boolean;
  chirpInfo: chirpObject[];
  title: string;
  message: string;
  tag: string;
  selectedUserId: string;
  users: IUsers[];
  tags: ITags[];
}

export default Home;
