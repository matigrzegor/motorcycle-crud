import React, { Component } from 'react'
import { connect } from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import MotorcycleDataService from "./../services/motorcycle.service";

class AddMotorcycle extends Component {
  saveMotorcycle = () => {
    if (this.validateData()) {
      const data = {
        brand: this.props.addMotorcycle.brand,
        description: this.props.addMotorcycle.description
      }
  
      MotorcycleDataService.create(data)
        .then(response => {
          // console.log(response.data)

          const responseData = {
            id: response.data.id,
            brand: response.data.brand,
            description: response.data.description,
            published: response.data.published,
            submitted: true
          }

          this.props.onValidData.bind(this, responseData)()
          this.props.onCleanCurrentMotorcycleFromMotorcyclesList.bind(this)()
        })
        .catch(e => {
          // console.log(e)
        })
    }
  }

  validateData = () => {
    let blank = []

    if (this.props.addMotorcycle.brand.length == 0) {
      blank.push('brand')
    }

    if (this.props.addMotorcycle.description.length == 0) {
      blank.push('description')
    }

    if (blank.length == 0) {
      return true
    } else {
      this.props.onInvalidData.bind(this, blank)()
    }
  }

  newMotorcycle = () => {
    const data = {
      id: null,
      brand: "",
      description: "",
      published: false,

      errors: {
        blank: []
      },
      submitted: false
    }

    this.props.onNewMotorcycle.bind(this, data)()
  }

	render(){
    return (
      <div className="submit-form">
        {this.props.addMotorcycle.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newMotorcycle}>
              Add next motorcycle
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              {this.props.addMotorcycle.errors.blank.includes('brand') ? <div class="alert alert-danger" role="alert">
                Brand can't be blank
              </div> : null}
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                className="form-control"
                id="brand"
                required
                value={this.props.addMotorcycle.brand}
                onChange={this.props.onChangeBrand}
                name="brand"
              />
            </div>

            <div className="form-group">
              {this.props.addMotorcycle.errors.blank.includes('description') ? <div class="alert alert-danger" role="alert">
                Description can't be blank
              </div> : null}
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.props.addMotorcycle.description}
                onChange={this.props.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveMotorcycle} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    addMotorcycle: {...state.addMotorcycle}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInvalidData: (blank) => dispatch({type: 'ADD_ERRORS_IN_ADD_MOTORCYCLE', blank: blank}),
    onValidData: (data) => dispatch({type: 'ADD_MOTORCYCLE_IN_ADD_MOTORCYCLE', data: data}),
    onChangeBrand: (event) => dispatch({type: 'CHANGE_BRAND_IN_ADD_MOTORCYCLE', brand: event.target.value}),
    onChangeDescription: (event) => dispatch({type: 'CHANGE_DESCRIPTION_IN_ADD_MOTORCYCLE', description: event.target.value}),
    onNewMotorcycle: (data) => dispatch({type: 'NEW_MOTORCYCLE_IN_ADD_MOTORCYCLE', data: data}),
    onCleanCurrentMotorcycleFromMotorcyclesList: () => dispatch({type: 'CLEAN_CURRENT_MOTORCYCLE_IN_MOTORCYCLES_LIST'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMotorcycle)
