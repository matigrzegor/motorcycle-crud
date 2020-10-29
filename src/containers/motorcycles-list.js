import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import MotorcycleDataService from "./../services/motorcycle.service";

class MotorcyclesList extends Component {
  componentDidMount() {
    this.retrieveMotorcycles();
  }

  retrieveMotorcycles = () => {
    MotorcycleDataService.getAll()
      .then(response => {
        // console.log(response.data)
        const motorcycles = response.data

        this.props.onRetrieveMotorcycles.bind(this, motorcycles)()
      })
      .catch(e => {
        // console.log(e)
      })
  }

  setCurrentMotorcycle = (motorcycle, index) => {
    this.props.onSetCurrentMotorcycle.bind(this, motorcycle, index)()
  }

	render(){
    const { motorcycles, currentMotorcycle, currentIndex } = this.props.motorcyclesList;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Motorcycles List</h4>

          <ul className="list-group">
            {motorcycles &&
              motorcycles.map((motorcycle, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={this.setCurrentMotorcycle.bind(this, motorcycle, index)}
                  key={index}
                >
                  {motorcycle.brand}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentMotorcycle ? (
            <div>
              <h4>Motorcycle</h4>
              <div>
                <label>
                  <strong>Brand:</strong>
                </label>{" "}
                {currentMotorcycle.brand}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentMotorcycle.description}
              </div>

              <Link
                to={"/motorcycles/" + currentMotorcycle.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Select a motorcycle</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    motorcyclesList: {...state.motorcyclesList}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRetrieveMotorcycles: (motorcycles) => dispatch({type: 'RETRIEVE_MOTORCYCLES_IN_MOTORCYCLES_LIST', motorcycles: motorcycles}),
    onSetCurrentMotorcycle: (motorcycle, index) => dispatch({
      type: 'SET_CURRENT_MOTORCYCLE_IN_MOTORCYCLES_LIST',
      motorcycle: motorcycle,
      index: index})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MotorcyclesList)
