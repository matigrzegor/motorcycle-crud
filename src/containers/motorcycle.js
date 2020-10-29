import React, { Component } from 'react'
import { connect } from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import MotorcycleDataService from "./../services/motorcycle.service";

class Motorcycle extends Component {
  componentDidMount() {
    this.getMotorcycle(this.props.match.params.id)
  }

  getMotorcycle = (id) => {
    MotorcycleDataService.get(id)
      .then(response => {
        // console.log(response.data)

        const data = {
          fetched: true,
    
          id: response.data.id,
          brand: response.data.brand,
          description: response.data.description
        }

        this.props.onGetMotorcycle.bind(this, data)()
      })
      .catch(e => {
        // console.log(e)
      })
  }

  updateMotorcycle = () => {
    if (this.validateData()) {
      const id = this.props.currentMotorcycle.id
      
      const data = {
        id: id,
        brand: this.props.currentMotorcycle.brand,
        description: this.props.currentMotorcycle.description
      }

      MotorcycleDataService.update(id, data)
        .then(response => {
          // console.log(response.data);

          const message = "The motorcycle was updated successfully!"

          this.props.onAddMessage.bind(this, message)()
          this.props.onCleanCurrentMotorcycleFromMotorcyclesList.bind(this)()
        })
        .catch(e => {
          // console.log(e)
        })
    }
  }

  validateData = () => {
    let blank = []

    if (this.props.currentMotorcycle.brand.length == 0) {
      blank.push('brand')
    }

    if (this.props.currentMotorcycle.description.length == 0) {
      blank.push('description')
    }

    if (blank.length == 0) {
      return true
    } else {
      this.props.onInvalidData.bind(this, blank)()
    }
  }

  deleteMotorcycle = () => {    
    MotorcycleDataService.delete(this.props.currentMotorcycle.id)
      .then(response => {
        // console.log(response.data)

        this.props.onCleanMotorcycle.bind(this)()
        this.props.onCleanCurrentMotorcycleFromMotorcyclesList.bind(this)()

        this.props.history.push('/motorcycles')
      })
      .catch(e => {
        // console.log(e)
      })
  }

	render(){
    const currentMotorcycle = this.props.currentMotorcycle;

    return (
      <div>
        {currentMotorcycle.fetched ? (
          <div className="edit-form">
            <h4>Motorcycle</h4>
            <form>
              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  className="form-control"
                  id="brand"
                  value={currentMotorcycle.brand}
                  onChange={this.props.onChangeBrand}
                />
                {this.props.currentMotorcycle.errors.blank.includes('brand') ? <div class="alert alert-danger" role="alert">
                  Brand can't be blank
                </div> : null}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentMotorcycle.description}
                  onChange={this.props.onChangeDescription}
                />
                {this.props.currentMotorcycle.errors.blank.includes('description') ? <div class="alert alert-danger" role="alert">
                  Description can't be blank
                </div> : null}
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteMotorcycle}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateMotorcycle}
            >
              Update
            </button>
            <p>{this.props.currentMotorcycle.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Motorcycle with id: {this.props.match.params.id} was not found</p>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentMotorcycle: {...state.currentMotorcycle}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInvalidData: (blank) => dispatch({type: 'ADD_ERRORS_IN_CURRENT_MOTORCYCLE', blank: blank}),
    onChangeBrand: (event) => dispatch({type: 'CHANGE_BRAND_IN_CURRENT_MOTORCYCLE', brand: event.target.value}),
    onChangeDescription: (event) => dispatch({type: 'CHANGE_DESCRIPTION_IN_CURRENT_MOTORCYCLE', description: event.target.value}),
    onGetMotorcycle: (data) => dispatch({type: 'GET_MOTORCYCLE_IN_CURRENT_MOTORCYCLE', data: data}),
    onCleanMotorcycle: () => dispatch({type: 'CLEAN_MOTORCYCLE_IN_CURRENT_MOTORCYCLE'}),
    onAddMessage: (message) => dispatch({type: 'ADD_MESSAGE_IN_CURRENT_MOTORCYCLE', message: message}),
    onCleanCurrentMotorcycleFromMotorcyclesList: () => dispatch({type: 'CLEAN_CURRENT_MOTORCYCLE_IN_MOTORCYCLES_LIST'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Motorcycle)
