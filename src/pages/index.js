import React from 'react'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import 'bootstrap/dist/css/bootstrap.min.css';

class IndexPage extends React.Component {

  state = {
    search: '',
    response: undefined
  };


  handleInputChange = () => {
    this.setState({ search: this.search.value });
  }

  handleSearch = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await fetch(`http://localhost:6969?search=${this.search.value || '*'}`);
    const response = await result.json();
    this.setState({ response })
  }

  render() {
    return <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

      <form className="container">
        <div className="d-flex justify-content-start">
          <input
            className="form-control"
            placeholder="search for recipe..."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />
          <button className="btn btn-primary ml-2" onClick={this.handleSearch}>search...</button>
        </div>

      </form>

      <div className="container-fluid">
        <div className="d-flex justify-content-center py-4 flex-row">
        {this.state.response && this.state.response['@search.facets'] && Object.keys(this.state.response['@search.facets']).map(f => 
            <div className="d-flex flex-column ml-4">
              <span>{f}</span>
              {this.state.response['@search.facets'][f].map(fc => <span class="mx-2">{fc.value} ({fc.count})</span>)}
            
            </div>)
          }
        </div>

        <div className="d-flex justify-content-center flex-wrap">
          
          {this.state.response && this.state.response.value && this.state.response.value.map(d =>
            (
              <div className="card m-2" key={d.RecipeId} style={{ width: '18rem' }}>
                <img className="card-img-top" src="https://recipe-images.azureedge.net/Medium/1589efb7-9284-4c82-8154-56d5f7f720fa.jpg" style={{ filter: 'blur(3px)' }} alt="Card image cap" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{d.Name}</h5>
                  <p className="card-text">{d.Description}</p>
                  {d.Energy && <p className="card-text">Energy: {d.Energy}kj</p>}
                  {d.Carbohydrate && <p className="card-text">Carbohydrate: {d.Carbohydrate}</p>}
                  {d.Fat &&<p className="card-text">Fat: {d.Fat}</p>}
                  {d.Protein &&<p className="card-text">Protein: {d.Protein}</p>}
                  {d.ReadyIn &&<p className="card-text">Ready in {d.ReadyIn} min</p>}
                  {d.NumberOfServes &&<p className="card-text">Serves {d.NumberOfServes} people</p>}
                  <a href={'https://myfoodbag.co.nz/recipes'} className="mt-auto btn btn-primary">See more...</a>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div style={{ width: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
      </div>
      {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
  }
}

export default IndexPage
