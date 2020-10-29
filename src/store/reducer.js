const initialState = {
	addMotorcycle: {
		id: null,
		brand: "",
		description: "", 
	
		errors: {
		  blank: []
		},
		submitted: false
  },
  currentMotorcycle: {
		fetched: false,
	
		id: null,
		brand: "",
		description: "",
	
		errors: {
		  blank: []
		},
		message: null
	},
  motorcyclesList: {
		motorcycles: [],
		currentMotorcycle: null,
		currentIndex: -1
	  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ERRORS_IN_ADD_MOTORCYCLE':
      return {
        ...state,
        addMotorcycle: {
          ...state.addMotorcycle,
          errors: {
            ...state.addMotorcycle.errors,
            blank: action.blank
          }
        }
      }
    case 'CHANGE_BRAND_IN_ADD_MOTORCYCLE':
      return {
        ...state,
        addMotorcycle: {
          ...state.addMotorcycle,
          brand: action.brand
        }
      }
    case 'CHANGE_DESCRIPTION_IN_ADD_MOTORCYCLE':
      return {
        ...state,
        addMotorcycle: {
          ...state.addMotorcycle,
          description: action.description
        }
      }
    case 'ADD_MOTORCYCLE_IN_ADD_MOTORCYCLE':
      return {
        ...state,
        addMotorcycle: {
          ...state.addMotorcycle,
          id: action.data.id,
          brand: action.data.brand,
          description: action.data.description,
          submitted: action.data.submitted
        }
      }
    case 'NEW_MOTORCYCLE_IN_ADD_MOTORCYCLE':
      return {
        ...state,
        addMotorcycle: {
          ...state.addMotorcycle,
          id: action.data.id,
          brand: action.data.brand,
          description: action.data.description,
          submitted: action.data.submitted,
          errors: action.data.errors
        }
      }
    case 'ADD_ERRORS_IN_CURRENT_MOTORCYCLE':
      return {
        ...state,
        currentMotorcycle: {
          ...state.currentMotorcycle,
          errors: {
            ...state.currentMotorcycle.errors,
            blank: action.blank
          }
        }
      }
    case 'GET_MOTORCYCLE_IN_CURRENT_MOTORCYCLE':
      return {
        ...state,
        currentMotorcycle: {
          ...state.currentMotorcycle,
          fetched: action.data.fetched,
      
          id: action.data.id,
          brand: action.data.brand,
          description: action.data.description
        }
      }
    case 'CHANGE_BRAND_IN_CURRENT_MOTORCYCLE':
      return {
        ...state,
        currentMotorcycle: {
          ...state.currentMotorcycle,
          brand: action.brand
        }
      }
    case 'CHANGE_DESCRIPTION_IN_CURRENT_MOTORCYCLE':
      return {
        ...state,
        currentMotorcycle: {
          ...state.currentMotorcycle,
          description: action.description
        }
      }
    case 'CLEAN_MOTORCYCLE_IN_CURRENT_MOTORCYCLE':
      return {
        ...state,
        currentMotorcycle: {
          fetched: false,
      
          id: null,
          brand: "",
          description: "",
      
          errors: {
            blank: []
          },
          message: null
        }
      }
    case 'ADD_MESSAGE_IN_CURRENT_MOTORCYCLE':
      return {
        ...state,
        currentMotorcycle: {
          ...state.currentMotorcycle,
          message: action.message
        }
      }
    case 'CLEAN_CURRENT_MOTORCYCLE_IN_MOTORCYCLES_LIST':
      return {
        ...state,
        motorcyclesList: {
          motorcycles: [],
          currentMotorcycle: null,
          currentIndex: -1
        }
      }
    case 'RETRIEVE_MOTORCYCLES_IN_MOTORCYCLES_LIST':
      return {
        ...state,
        motorcyclesList: {
          ...state.motorcyclesList,
          motorcycles: action.motorcycles
        }
      }
    case 'SET_CURRENT_MOTORCYCLE_IN_MOTORCYCLES_LIST':
      return {
        ...state,
        motorcyclesList: {
          ...state.motorcyclesList,
          currentMotorcycle: action.motorcycle,
          currentIndex: action.index
        }
      }
  }

	return state
}

export default reducer