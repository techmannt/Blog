import * as React from 'react';
import { RouteComponentProps } from 'react-router';

class Edit extends React.Component<IEditProps, IEditState> {
  constructor(props: IEditProps) {
    super(props);
    this.state = {
      title: '',
      tag: '',
      content: '',
      selectedTagId: "0",
      tags: [],
    };
  }

  async componentDidMount() {
    try {
      let chirpData = await fetch(`/api/users/${this.props.match.params.id}`);
      let chirpInfo = await chirpData.json();

      let tagData = await fetch(`/api/tags`);
      let tagInfo = await tagData.json();

      console.log(chirpInfo);
      console.log('tags: ', tagInfo);
      this.setState({
        title: chirpInfo[0].title,
        content: chirpInfo[0].content,
        tags: tagInfo
      });
      console.log('state = ', this.state);
    } catch (error) {
      console.log(error);
    }
  }

  async handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    let editedBody = {
      title: this.state.title,
      content: this.state.content
    };
    try {
      let chirpData = await fetch(`/api/users/${this.props.match.params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedBody)
      });
      if (chirpData.ok) {
        this.props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    try {
      let chirpData = await fetch(`/api/users/${this.props.match.params.id}`, {
        method: "DELETE"
      });
      if (chirpData.ok) {
        this.props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <main className="container">
        <section className="row justify-content-center my-2">
          <div className="col-md-8">
            <form className="form-group p-3 shadow border">
              <label>Title:</label>
              <input type="text" className="form-control" name="title" value={this.state.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ title: e.target.value })} />
              <label>Tag:</label>

              <select
                value={this.state.selectedTagId}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setState({ selectedTagId: e.target.value })}
                className="form-control"
                name="selectTag">
                <option value="0">Select...</option>
                {this.state.tags.map(tag => (
                  <option key={tag.id} value={tag.id}>{tag.name}</option>
                ))}
              </select>

              <label>Message:</label>
              <input type="text" className="form-control" name="content" value={this.state.content}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ content: e.target.value })} />
              <div className="d-flex mt-3 justify-content-between">
                <button className="btn btn-primary shadow" onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.handleEdit(e)}>Save Edit</button>
                <button className="btn btn-danger shadow" onClick={(e: React.MouseEvent<HTMLButtonElement>) => this.handleDelete(e)}>DELETE!</button>
              </div>
            </form>

          </div>
        </section>
      </main>

    )
  }

}

interface IEditProps extends RouteComponentProps<{ id: string }> { }

interface ITags {
  name: string;
  id: string;
}

interface IEditState {
  title: string,
  tag: string,
  content: string,
  selectedTagId: string,
  tags: ITags[]
}

export default Edit;
