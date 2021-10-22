const initState = {
    cars: [],
    years: [],
    selectedYear: 2020,
    selectedBrand: '',
    selectedModel: '',
    loading: false,
    error: ''
}

const carsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'cars/loading': {
            return { ...state, loading: true }
        }
        case 'cars/success': {
            return { ...state, loading: false, cars: action.payload, years: action.payload.map((data) => data.year) }
        }
        case 'cars/error': {
            return { ...state, loading: false, cars: [], error: action.payload }
        }
        default:
            return state
    }
};

export default carsReducer;