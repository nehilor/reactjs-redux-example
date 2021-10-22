import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Button, Card, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { fetchCars } from './store/actions/cars.actions';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        }
    },
    select: {
        width: '300px',
        marginTop: '15px !important'
    }
}));

const colors = ['Red', 'Green', 'Blue', 'Gray', 'Black', 'White'];

const Form = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const carsData = useSelector((state) => state.cars);
    const years = useSelector((state) => state.years);
    const isLoading = useSelector((state) => state.loading);
    const selectedYear = useSelector((state) => state.selectedYear);
    // create state variables for each input
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [year, setYear] = useState(selectedYear);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [plate, setPlate] = useState('');
    const [availableYears, setAvailableYears] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);

    useEffect(() => {
        if (!isLoading && !carsData.length) {
            dispatch(fetchCars);
        }
    }, [carsData.length, dispatch, isLoading]);

    useEffect(() => {
        if(years.length) {
            setAvailableYears(years);
        }
    }, [years]);

    const handleSubmit = e => {
        e.preventDefault();
    };

    const handleChangeYear = (e) => {
        const year = e.target.value;
        if(year) {
            const filter = carsData.filter(data => data.year === year);
            const brands = Object.keys(filter[0].brands[0]);
            setBrands(brands);
            setYear(year);
        }
    };

    const handleChangeBrand = (e) => {
        const brand = e.target.value;
        const filter = carsData.filter(data => data.year === year);
        let models = [];
        for (var [key, value] of Object.entries(filter[0].brands[0])) {
            if(key === brand) {
                models = value.models;
                break;
            }
        }
        if(models) {
            setBrand(brand);
            setModels(models);
        }
    };

    const handleChangeModel = (e) => {
        const model = e.target.value;
        setModel(model);
    };

    const handleChangeColor = (e) => {
        const color = e.target.value;
        setColor(color);
    };

    return (
        <Card variant="outlined">
            <Typography variant="h4" component="h2">
                Form Example
            </Typography>
            <form className={classes.root} onSubmit={handleSubmit}>
                <TextField
                    label="First Name"
                    variant="standard"
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
                <TextField
                    label="Last Name"
                    variant="standard"
                    required
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <TextField
                    label="Phone"
                    variant="standard"
                    type="text"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                />
                <FormControl className={classes.select}>
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Year"
                        onChange={handleChangeYear}
                        value={year ? year : ''}
                    >
                        {availableYears.map((y, i) => <MenuItem key={i} value={y}>{y}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl className={classes.select}>
                    <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={brand ? brand : ''}
                        label="Brand"
                        onChange={handleChangeBrand}
                    >
                        {brands.map((b, i) => <MenuItem key={i} value={b}>{b}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl className={classes.select}>
                    <InputLabel id="demo-simple-select-label">Model</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={model ? model : ''}
                        label="Model"
                        onChange={handleChangeModel}
                    >
                        {models.map((m, i) => <MenuItem key={i} value={m}>{m}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl className={classes.select}>
                    <InputLabel id="demo-simple-select-label">Color</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={color}
                        label="Color"
                        onChange={handleChangeColor}
                        required
                    >
                        {colors.map((c, i) => <MenuItem key={i} value={c}>{c}</MenuItem>)}
                    </Select>
                </FormControl>
                <TextField
                    label="Plate"
                    variant="standard"
                    type="text"
                    required
                    value={plate}
                    onChange={e => setPlate(e.target.value)}
                />
                <div>
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                </div>
            </form>
        </Card>


    );
};

export default Form;