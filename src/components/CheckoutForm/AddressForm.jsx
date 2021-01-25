import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'

import { commerce } from '../../lib/commerce'

import FormInput from './FormInput'

const AddressForm = ({ checkoutToken }) => {
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')
    const methods = useForm()

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })) 

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)

        console.log(countries)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <FormProvider { ...methods }>
                <form onSubmit={null}>
                    <Grid container spacing={ 3 }>
                        <FormInput required name='firstName' label='First Name'/>
                        <FormInput required name='lastName' label='Last Name'/>
                        <FormInput required name='email' label='Email Address'/>
                        <FormInput required name='address' label='Address'/>
                        <FormInput required name='city' label='City'/>
                        <FormInput required name='zip' label='ZIP / Postal Code'/>
                        <FormInput required name='gamerTag' label='Riot ID, Steam ID, Gamer Tag'/>
                        <FormInput name='discord' label='Discord Handle'/>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={ shippingCountry } fullWidth 
                            onChange={ (e) => setShippingCountry(e.target.value) }>
                                { countries.map((country) => (
                                    <MenuItem key={ country.id } value={ country.id }>
                                        { country.label }
                                    </MenuItem>
                                )) }
                                {/* <MenuItem key={null} value={null}>
                                    Select Me
                                </MenuItem> */}
                            </Select>
                        </Grid>
                        {/* <Grid item xs={ 12 } sm={ 6 }>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={null} fullWidth onChange={null}>
                                <MenuItem key={null} value={null}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={null} fullWidth onChange={null}>
                                <MenuItem key={null} value={null}>
                                    Select Me
                                </MenuItem>
                            </Select>
                        </Grid> */}
                    </Grid>
                </form>

            </FormProvider>
        </>
    )
}

export default AddressForm
