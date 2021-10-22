const fetchCars = async (dispatch, getState) => {
    dispatch({ type: 'cars/loading' })
    const response = await fetch('https://mocki.io/v1/5320d7e4-e32e-4a88-80e3-8d4f090a3d48');
    const payload = await response.json();
    dispatch({ type: 'cars/success', payload })
};

export { fetchCars };