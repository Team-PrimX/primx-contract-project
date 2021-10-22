//#region ⬇⬇ All document setup, below:
// ⬇ File Imports: 
import ButtonToggle from '../ButtonToggle/ButtonToggle';
import EstimateCombineTable from './EstimateCombineTable';
// ⬇ Dependent Functionality:
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useEstimateCalculations from '../../hooks/useEstimateCalculations';
import { Button, MenuItem, TextField, Select, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, FormHelperText, Snackbar } from '@material-ui/core';
import { useParams } from 'react-router';
import { useStyles } from '../MuiStyling/MuiStyling';
import { firstCombinedEstimate, secondCombinedEstimate, thirdCombinedEstimate } from '../../redux/reducers/combineEstimates.reducer';
//#endregion ⬆⬆ All document setup above.



export default function EstimateCombine() {
  //#region ⬇⬇ All state variables below:
  const companies = useSelector(store => store.companies);
  // ⬇ searchResult below is an estimate object searched from the DB that has already been mutated by the useEstimateCalculations function.
  const searchResult = useSelector(store => store.estimatesReducer.searchedEstimate);
  // const combinedResult = useSelector(store => store.estimatesReducer.combinedEstimate);

  const searchQuery = useSelector(store => store.estimatesReducer.searchQuery);
  const combineQuery = useSelector(store => store.combineEstimatesReducer.combineQuery);
  const firstCombinedEstimate = useSelector(store => store.combineEstimatesReducer.firstCombinedEstimate);
  const secondCombinedEstimate = useSelector(store => store.combineEstimatesReducer.secondCombinedEstimate);
  const thirdCombinedEstimate = useSelector(store => store.combineEstimatesReducer.thirdCombinedEstimate);
  const combinedEstimatesData = useSelector(store => store.combineEstimatesReducer.combinedEstimatesData);

  const [error, setError] = useState(false);
  const classes = useStyles(); // Keep in for MUI styling. 
  const [selectError, setSelectError] = useState("");
  // ⬇ Component has a main view at /lookup and a sub-view of /lookup/... where ... is the licensee ID appended with the estimate number.
  const { licensee_id_searched, first_estimate_number_combined, second_estimate_number_combined, third_estimate_number_combined } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  let estArray = [];
  // ⬇ Run on page load:
  useEffect(() => {
    // ⬇ Make the toggle button show this selection:
    dispatch({ type: 'SET_BUTTON_STATE', payload: 'combine' }),
      // ⬇ Fetch the current companies for drop-down menu options:
      dispatch({ type: 'FETCH_ACTIVE_COMPANIES' })
  }, []);
  // ⬇ Run on estimate search complete:
  useEffect(() => {
    // ⬇ If the user got here with params, either by searching from the lookup view or by clicking a link in the admin table view, dispatch the data in the URL params to run a GET request to the DB.
    if (licensee_id_searched && first_estimate_number_combined && second_estimate_number_combined && third_estimate_number_combined) {
      dispatch({
        type: 'FETCH_FIRST_ESTIMATE_QUERY',
        payload: {
          licensee_id: licensee_id_searched,
          estimate_number: first_estimate_number_combined
        } // End payload
      }), // End dispatch
        dispatch({
          type: 'FETCH_SECOND_ESTIMATE_QUERY',
          payload: {
            licensee_id: licensee_id_searched,
            estimate_number: second_estimate_number_combined
          } // End payload
        }), // End dispatch
        dispatch({
          type: 'FETCH_THIRD_ESTIMATE_QUERY',
          payload: {
            licensee_id: licensee_id_searched,
            estimate_number: third_estimate_number_combined
          } // End payload
        }) // End dispatch
    } else if (licensee_id_searched && first_estimate_number_combined && second_estimate_number_combined) {
      dispatch({
        type: 'FETCH_FIRST_ESTIMATE_QUERY',
        payload: {
          licensee_id: licensee_id_searched,
          estimate_number: first_estimate_number_combined
        } // End payload
      }), // End dispatch
        dispatch({
          type: 'FETCH_SECOND_ESTIMATE_QUERY',
          payload: {
            licensee_id: licensee_id_searched,
            estimate_number: second_estimate_number_combined
          } // End payload
        }) // End dispatch
    } // End if statement
  }, [licensee_id_searched, first_estimate_number_combined, second_estimate_number_combined, third_estimate_number_combined]
  );
  // When the page loads with the Estimate Number queries, run this to see loop through the requested estimates, combined their raw quantity data, and send it through the math machine:
  // useEffect(() => {
  //   if (combinedEstimatesData) {
  //     // loop through and make an object
  //     let combinedEstimateTotals = {
  //       anticipated_first_pour_date: firstCombinedEstimate.anticipated_first_pour_date,
  //       archived: firstCombinedEstimate.archived,
  //       country: firstCombinedEstimate.country,
  //       date_created: firstCombinedEstimate.date_created,
  //       estimate_number: firstCombinedEstimate.estimate_number,
  //       floor_type: firstCombinedEstimate.floor_type,
  //       floor_types_id: firstCombinedEstimate.floor_types_id,
  //       id: firstCombinedEstimate.id,
  //       licensee_contractor_name: firstCombinedEstimate.licensee_contractor_name,
  //       licensee_id: firstCombinedEstimate.licensee_id,
  //       marked_as_ordered: firstCombinedEstimate.marked_as_ordered,
  //       measurement_units: firstCombinedEstimate.measurement_units,
  //       order_number: firstCombinedEstimate.order_number,
  //       ordered_by_licensee: firstCombinedEstimate.ordered_by_licensee,
  //       placement_type: firstCombinedEstimate.placement_type,
  //       placement_types_id: firstCombinedEstimate.placement_types_id,
  //       po_number: firstCombinedEstimate.po_number,
  //       primx_cpea_dosage_liters: firstCombinedEstimate.primx_cpea_dosage_liters,
  //       primx_cpea_shipping_estimate: firstCombinedEstimate.primx_cpea_shipping_estimate,
  //       primx_cpea_unit_price: firstCombinedEstimate.primx_cpea_unit_price,
  //       primx_dc_shipping_estimate: firstCombinedEstimate.primx_dc_shipping_estimate,
  //       primx_dc_unit_price: firstCombinedEstimate.primx_dc_unit_price,
  //       primx_flow_dosage_liters: firstCombinedEstimate.primx_flow_dosage_liters,
  //       primx_flow_shipping_estimate: firstCombinedEstimate.primx_flow_shipping_estimate,
  //       primx_flow_unit_price: firstCombinedEstimate.primx_flow_unit_price,
  //       primx_steel_fibers_dosage_kgs: firstCombinedEstimate.primx_steel_fibers_dosage_kgs,
  //       primx_steel_fibers_dosage_lbs: firstCombinedEstimate.primx_steel_fibers_dosage_lbs,
  //       primx_steel_fibers_shipping_estimate: firstCombinedEstimate.primx_steel_fibers_shipping_estimate,
  //       primx_steel_fibers_unit_price: firstCombinedEstimate.primx_steel_fibers_unit_price,
  //       primx_ultracure_blankets_unit_price: firstCombinedEstimate.primx_ultracure_blankets_unit_price,
  //       processed_by: firstCombinedEstimate.processed_by,
  //       project_general_contractor: firstCombinedEstimate.project_general_contractor,
  //       project_manager_email: firstCombinedEstimate.project_manager_email,
  //       project_manager_name: firstCombinedEstimate.project_manager_name,
  //       project_manager_phone: firstCombinedEstimate.project_manager_phone,
  //       project_name: firstCombinedEstimate.project_name,
  //       ship_to_address: firstCombinedEstimate.ship_to_address,
  //       ship_to_city: firstCombinedEstimate.ship_to_city,
  //       ship_to_state_province: firstCombinedEstimate.ship_to_state_province,
  //       shipping_costs_id: firstCombinedEstimate.shipping_costs_id,
  //       square_feet: firstCombinedEstimate.square_feet,
  //       square_meters: firstCombinedEstimate.square_meters,
  //       thickened_edge_construction_joint_lineal_feet: firstCombinedEstimate.thickened_edge_construction_joint_lineal_feet,
  //       thickened_edge_construction_joint_lineal_meters: firstCombinedEstimate.thickened_edge_construction_joint_lineal_meters,
  //       thickened_edge_perimeter_lineal_feet: firstCombinedEstimate.thickened_edge_perimeter_lineal_feet,
  //       thickened_edge_perimeter_lineal_meters: firstCombinedEstimate.thickened_edge_perimeter_lineal_meters,
  //       thickness_inches: firstCombinedEstimate.thickness_inches,
  //       thickness_millimeters: firstCombinedEstimate.thickness_millimeters,
  //       waste_factor_percentage: firstCombinedEstimate.waste_factor_percentage,
  //       zip_postal_code: firstCombinedEstimate.zip_postal_code
  //     }
  //     // for (let estimates in combinedEstimatesData) {
  //     //   // combinedEstimateTotals += estimate;
  //     // }
  //     console.log(combinedEstimateTotals);
  //     // have the totals +='d to the first one
  //     // run that object through the machine, below

  //     // ⬇ Once all the keys exist, run the calculate estimate function and set the table display state for the calculated values:
  //     // dispatch({
  //     //   type: 'HANDLE_CALCULATED_COMBINED_ESTIMATE',
  //     //   payload: 
  //     // });
  //   } // End if statement 
  // }, [combinedEstimatesData]); // End useEffect
  // #endregion ⬆⬆ All state variables above. 


  //#region ⬇⬇ Event handlers below:
  /** ⬇ handleChange:
   * Change handler for the estimate search form. Will send their entries to a reducer.
   */
  const handleChange = (key, value) => {
    // setSearchQuery({ ...searchQuery, [key]: value })
    dispatch({
      type: 'SET_COMBINE_QUERY',
      payload: { key: key, value: value }
    }); // End dispatch
  }; // End handleChange

  /** ⬇ handleSubmit:
   * When submitted, will search for the entered estimate to populate the tables. 
   */
  const handleSubmit = (event) => {
    // ⬇ Don't refresh until submit:
    event.preventDefault();
    // ⬇ Clearing validation each time: 
    setError(false);
    setSelectError("");
    // ⬇ Clearing reducers data before submission to prevent zombie data:
    dispatch({ type: 'CLEAR_COMBINED_ESTIMATES_DATA' })
    // ⬇ Select dropdown validation:
    if (combineQuery.licensee_id === 0) {
      // ⬇ If they haven't selected a drop-down, pop up warning and prevent them:
      setError(true);
      setSelectError("Please select a value.");
    } // ⬇ If they have selected a drop-down, run another if statement to see if two or three estimates were entered:
    else {
      // ⬇ If they entered three estimate numbers:
      if (combineQuery.first_estimate_number && combineQuery.second_estimate_number && combineQuery.third_estimate_number) {
        history.push(`/combine/${combineQuery.licensee_id}/${combineQuery.first_estimate_number}/${combineQuery.second_estimate_number}/${combineQuery.third_estimate_number}`);
      } // ⬇ If they only entered two estimate numbers: 
      else if (combineQuery.first_estimate_number && combineQuery.second_estimate_number) {
        history.push(`/combine/${combineQuery.licensee_id}/${combineQuery.first_estimate_number}/${combineQuery.second_estimate_number}`);
      } // End if/else statement
    } // End if statement
  }; // End handleSubmit
  //#endregion ⬆⬆ Event handlers above. 


  // ⬇ Rendering below:
  return (
    <div className="EstimateCreate-wrapper">

      <section className="removeInPrint">
        <ButtonToggle />

        <br />

        <form onSubmit={handleSubmit}>
          <Grid container
            spacing={2}
            justifyContent="center"
          >

            {/* Grid #1: The Search Bar for Estimate Lookup */}
            <Grid item xs={12}>
              <Paper elevation={3}>
                <TableContainer >
                  <Table size="small">
                    <TableBody>
                      <TableRow>

                        <TableCell><b>Licensee/Contractor Name:</b></TableCell>
                        <TableCell>
                          <FormControl error={error}>
                            <Select
                              onChange={event => handleChange('licensee_id', event.target.value)}
                              required
                              size="small"
                              fullWidth
                              value={combineQuery.licensee_id}
                            >
                              <MenuItem key="0" value="0">Please Select</MenuItem>
                              {companies.map(companies => {
                                return (<MenuItem key={companies.id} value={companies.id}>{companies.licensee_contractor_name}</MenuItem>)
                              }
                              )}
                            </Select>
                            <FormHelperText>{selectError}</FormHelperText>
                          </FormControl>
                        </TableCell>

                        <TableCell><b>First Estimate Number:</b></TableCell>
                        <TableCell>
                          <TextField
                            onChange={event => handleChange('first_estimate_number', event.target.value)}
                            required
                            type="search"
                            size="small"
                            fullWidth
                            value={combineQuery.first_estimate_number}
                          />
                        </TableCell>

                        <TableCell colSpan={2} align="right">
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell><b>Second Estimate Number:</b></TableCell>
                        <TableCell>
                          <TextField
                            onChange={event => handleChange('second_estimate_number', event.target.value)}
                            required
                            type="search"
                            size="small"
                            fullWidth
                            value={combineQuery.second_estimate_number}
                          />
                        </TableCell>

                        <TableCell><b>Third Estimate Number:</b></TableCell>
                        <TableCell>
                          <TextField
                            onChange={event => handleChange('third_estimate_number', event.target.value)}
                            type="search"
                            size="small"
                            fullWidth
                            value={combineQuery.third_estimate_number}
                          />
                        </TableCell>

                        <TableCell colSpan={2} align="right">
                          <Button
                            type="submit"
                            variant="contained"
                            className={classes.LexendTeraFont11}
                            color="primary"
                          >
                            Search
                          </Button>
                        </TableCell>
                      </TableRow>

                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </section>
      <br />
      {/* End estimate search form */}

      {/* Conditionally render entire code block below if the user has successfully combined estimates */}
      {/* {combinedResult.estimate_number &&
        <EstimateCombineTable />
      } */}

      {/* 
      {combinedResult.estimate_number ? (
        <>
          <p>
            This feature allows you to combine up to three (3) existing estimates into one order for a reduced shipping cost. <br />
            The first and second estimate numbers are required to use this feature.  The third estimate number is optional. <br />
            All estimates MUST go to the same shipping location in order to qualify for this reduced rate. <br />
            <b>Please be aware that whatever the Shipping/Contact Information is for the FIRST estimate number entered, that will be the information used for the other estimate(s).</b> <br />
            If you need to edit the information for any of the estimates used, that must be done in the "Search For Estimate" page.
          </p>
        </>
      ) : (
        <EstimateCombineTable />
      )}
      
      */}

    </div>
  )
}
