import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
var moment = require('moment');

const DisplayBlog: React.FC<BlogCardProps> = (props) => {
  const [blogEntry, setBlogEntry] = useState([]);

  useEffect(() => {

    async function loadBlog() {
      let res = await fetch(`/api/users/${props.match.params.id}`);
      let blogInfo = await res.json();

      setBlogEntry(blogInfo);

    }

    loadBlog();

  }, []);

  if (Object.entries(blogEntry).length === 0) {
    return (
      <div>loading...</div>
    );
  } else {
    return (
      <div className="col-md-4" key={blogEntry[0].id}>
        <div className="card">
          <img src="https://i.ibb.co/rG6jhns/starwars.jpg" alt="theme"></img>
          <div className="card-body">
            <h5 className="card-title">{blogEntry[0].title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{moment(blogEntry[0].created).format("MMM. DD, YYYY")}</h6>
            <p className="card-text">{blogEntry[0].name}</p>
            <div className="d-flex mt-3 justify-content-between">
              <Link className="card-link btn btn-primary" to={`/`}>Go Back</Link>
              <Link className="card-link btn btn-primary" to={`/edit/${blogEntry[0].id}`}>Edit</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

interface BlogCardProps extends RouteComponentProps<{ id: string }> { }

export default DisplayBlog;
