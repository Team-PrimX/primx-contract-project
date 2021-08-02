//#region ⬇⬇ All document setup, below:
// ⬇ File Imports: 
// ⬇ Dependent Functionality:
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useEstimateCalculations from '../../hooks/useEstimateCalculations';

import { Button, MenuItem, TextField, InputLabel, Select, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, InputAdornment, Snackbar } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useStyles } from '../MuiStyling/MuiStyling';
import LicenseeHomePage from '../LicenseeHomePage/LicenseeHomePage';

//#endregion ⬆⬆ All document setup above.


export default function MetricTable() {
  // //#region ⬇⬇ All state variables below:
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const today = new Date().toISOString().substring(0, 10);
  const calculateEstimate = useEstimateCalculations;

  // const [newEstimate, setNewEstimate] = useState({
  //   measurement_units: 'imperial',
  //   country: 'United States',
  //   date_created: today,
  // });

  const companies = useSelector(store => store.companies);
  const shippingCosts = useSelector(store => store.shippingCosts);
  const floorTypes = useSelector(store => store.floorTypes);
  const placementTypes = useSelector(store => store.placementTypes);
  const estimateData = useSelector(store => store.estimatesReducer.estimatesReducer);
  const [calculatedDisplayObject, setCalculatedDisplayObject] = useState({});

  //   // ⬇ GET on page load:
  //   useEffect(() => {
  //     // Licensee/Company Name Call
  //     dispatch({ type: 'FETCH_COMPANIES' }),
  //       // State/Province Call
  //       dispatch({ type: 'FETCH_SHIPPING_COSTS' }),
  //       // Floor Type Call
  //       dispatch({ type: 'FETCH_FLOOR_TYPES' }),
  //       // Placement Type Call
  //       dispatch({ type: 'FETCH_PLACEMENT_TYPES' })
  //   }, []);
  //   //#endregion ⬆⬆ All state variables above. 

  // have a useEffect looking at the estimateData object. If all necessary keys exist indicating user has entered all necessary form data,
  // run the estimate calculations functions to display the rest of the table. This also makes the materials table adjust automatically if the user changes
  // values
  useEffect(() => {
    if (estimateData.square_meters && estimateData.thickness_millimeters && estimateData.thickened_edge_construction_joint_lineal_meters &&
      estimateData.thickened_edge_perimeter_lineal_meters && estimateData.primx_flow_dosage_liters && estimateData.primx_steel_fibers_dosage_kgs &&
      estimateData.primx_cpea_dosage_liters) {
      // once all the keys exist, run the calculate estimate function and set the table display state for the calculated values
      const calculatedObject = calculateEstimate(estimateData)
      setCalculatedDisplayObject(calculatedObject)
    }
  }, [estimateData])

  //#region ⬇⬇ Event handlers below:
  /** ⬇ handleChange:
   * When the user types, this will set their input to the kit object with keys for each field. 
   */
  const handleChange = (key, value) => {
    console.log('In handleChange, key/value:', key, '/', value);
    // setNewEstimate({ ...newEstimate, [key]: value });

    dispatch({
      type: 'SET_ESTIMATE',
      payload: { key: key, value: value }
    });
  } // End handleChange

  /** ⬇ handleSubmit:
   * When clicked, this will post the object to the DB and send the user back to the dashboard. 
   */
  const handleSubmit = event => {
    console.log('In handleSubmit');
    // ⬇ Don't refresh until submit:
    event.preventDefault();
    // // ⬇ Sending newPlant to our reducer: 
    // dispatch({ type: 'ADD_NEW_KIT', payload: newKit });
    // // ⬇ Send the user back:
    // history.push('/dashboard');
  } // End handleSubmit

  /** ⬇ handleSubmit:
 * When clicked, this will post the object to the DB and send the user back to the dashboard. 
 */
  const handleSave = event => {
    console.log('In Metric handleSave');
    // attach history from useHistory to the estimate object to allow navigation from inside the saga
    estimateData.history = history;

    // ⬇ Don't refresh until submit:
    event.preventDefault();
    // send the estimate object to be POSTed
    dispatch({ type: 'ADD_ESTIMATE', payload: estimateData })
  } // End handleSave


  const handleCalculateCosts = () => {
    console.log('In Metric handleCalculateCosts, estimateData:', estimateData);
    const calculatedObject = calculateEstimate(estimateData)
    setCalculatedDisplayObject(calculatedObject)
    console.log('***CALCULATED OBJECT****', calculatedObject);
    // console.log('DISPLAY OBJECT', calculatedDisplayObject);
    // dispatch({type: 'FETCH_ESTIMATE', payload: calculatedObject});
  }
  //#endregion ⬆⬆ Event handles above. 


  return (
    <>
      <form onSubmit={handleSave}>
        <Grid container
          spacing={2}
          justifyContent="center"
        >

          <Grid item xs={12}>
            <Paper elevation={3}>
              <TableContainer>
                <Table size="small">

                  <TableHead>
                    <TableCell align="center" colSpan={2}><h3>Project Quantity Inputs</h3></TableCell>
                    <TableCell align="center" colSpan={2}><h3>Thickened Edge Inputs</h3></TableCell>
                    <TableCell align="center" colSpan={2}><h3>Materials Required Inputs</h3></TableCell>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell><b>Square Meters:</b>
                      </TableCell>
                      <TableCell>
                        <TextField
                          onChange={event => handleChange('square_meters', event.target.value)}
                          required
                          type="number"
                          size="small"
                          fullWidth
                          InputProps={{
                            endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                          }}
                          defaultValue={estimateData.square_meters}
                        />
                      </TableCell>

                      <TableCell><b>Lineal Meters @ Perimeter:</b>
                      </TableCell>
                      <TableCell>
                        <TextField
                          onChange={event => handleChange('thickened_edge_perimeter_lineal_meters', event.target.value)}
                          required
                          type="number"
                          size="small"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">m</InputAdornment>,
                          }}
                          fullWidth
                          defaultValue={estimateData.thickened_edge_perimeter_lineal_meters}
                        />
                      </TableCell>

                      <TableCell><b>PrīmX Flow @ Dosage Rate per m³:</b>
                      </TableCell>
                      <TableCell>
                        <TextField
                          onChange={event => handleChange('primx_flow_dosage_liters', event.target.value)}
                          required
                          type="number"
                          size="small"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">ltrs</InputAdornment>,
                          }}
                          fullWidth
                          defaultValue={estimateData.primx_flow_dosage_liters}
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Thickness:</b>
                      </TableCell>
                      <TableCell>
                        <TextField
                          onChange={event => handleChange('thickness_millimeters', event.target.value)}
                          required
                          type="number"
                          size="small"
                          fullWidth
                          InputProps={{
                            endAdornment: <InputAdornment position="end">mm</InputAdornment>,
                          }}
                          defaultValue={estimateData.thickness_millimeters}
                        />
                      </TableCell>

                      <TableCell><b>Lineal Meters @ Construction Joint:</b>
                      </TableCell>
                      <TableCell>
                        <TextField
                          onChange={event => handleChange('thickened_edge_construction_joint_lineal_meters', event.target.value)}
                          required
                          type="number"
                          size="small"
                          fullWidth
                          InputProps={{
                            endAdornment: <InputAdornment position="end">m</InputAdornment>,
                          }}
                          defaultValue={estimateData.thickened_edge_construction_joint_lineal_meters}
                        />
                      </TableCell>

                      <TableCell><b>PrīmX Steel Fibers @ Dosage Rate per m³:</b>
                      </TableCell>
                      <TableCell>
                        <TextField
                          onChange={event => handleChange('primx_steel_fibers_dosage_kgs', event.target.value)}
                          required
                          type="number"
                          size="small"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">kgs</InputAdornment>,
                          }}
                          fullWidth
                          defaultValue={estimateData.primx_steel_fibers_dosage_kgs}
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell><b>PrīmX CPEA @ Dosage Rate per m³:</b>
                      </TableCell>
                      <TableCell>
                        <TextField
                          onChange={event => handleChange('primx_cpea_dosage_liters', event.target.value)}
                          required
                          type="number"
                          size="small"
                          InputProps={{
                            endAdornment: <InputAdornment position="end">ltrs</InputAdornment>,
                          }}
                          fullWidth
                          defaultValue={estimateData.primx_cpea_dosage_liters}
                        />
                      </TableCell>
                    </TableRow>

                    {/* <TableRow>
                      <TableCell colSpan={6} align="right">
                        <Button
                          type="submit"
                          // ⬇⬇⬇⬇ COMMENT THIS CODE IN/OUT FOR FORM VALIDATION:
                          // onClick={event => handleSave(event)}
                          variant="contained"
                          className={classes.LexendTeraFont11}
                          color="secondary"
                        >
                          Save Estimate
                        </Button>
                      </TableCell>
                    </TableRow> */}

                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper elevation={3}>
              <TableContainer>
                <h3>Project Quantity Calculations</h3>
                <Table size="small">
                  <TableBody>

                    <TableRow>
                      <TableCell><b>Square Meters:</b></TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.square_meters}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Thickness (mm):</b></TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.thickness_millimeters}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Cubic Meters:</b></TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.cubic_meters}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Thickening @ Perimeter (m³):</b></TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.perimeter_thickening_cubic_meters}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Thickening @ Construction Joints (m³):</b></TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.construction_joint_thickening_cubic_meters}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Subtotal:</b></TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.cubic_meters_subtotal}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Waste Factor @ 5% (m³):</b></TableCell>
                      <TableCell>{calculatedDisplayObject?.waste_factor_cubic_meters}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Total Cubic Meters:</b></TableCell>
                      <TableCell>{calculatedDisplayObject?.design_cubic_meters_total}</TableCell>
                    </TableRow>

                  </TableBody>
                </Table>

                <h3>Thickened Edge Calculations</h3>
                <p>If applicable, for slabs under 150mm.<br />Note: For 'Slab on Insulation', enter "0" for both.</p>

                <Table size="small">

                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell><b>Perimeter</b></TableCell>
                      <TableCell><b>Construction Joint</b></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell><b>Lineal Meters:</b></TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.thickened_edge_perimeter_lineal_meters}
                      </TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.thickened_edge_construction_joint_lineal_meters}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Width (m³):</b></TableCell>
                      <TableCell>1.5</TableCell>
                      <TableCell>3.0</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Additional Thickness (mm):</b></TableCell>
                      <TableCell>{calculatedDisplayObject?.additional_thickness_millimeters}</TableCell>
                      <TableCell>{calculatedDisplayObject?.additional_thickness_millimeters}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Cubic Meters:</b></TableCell>
                      <TableCell>{calculatedDisplayObject?.perimeter_thickening_cubic_meters}</TableCell>
                      <TableCell>{calculatedDisplayObject?.construction_joint_thickening_cubic_meters}</TableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={8}>
            <Paper elevation={3}>
              <TableContainer>
                <h3>Materials Required Calculations</h3>
                <Table size="small">

                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell><b>PrīmX DC (kgs)</b></TableCell>
                      <TableCell><b>PrīmX Flow (ltrs)</b></TableCell>
                      <TableCell><b>PrīmX Steel Fibers (kgs)</b></TableCell>
                      <TableCell><b>PrīmX UltraCure Blankets (m²)</b></TableCell>
                      <TableCell><b>PrīmX CPEA (ltrs)</b></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell><b>Dosage Rate per m³:</b></TableCell>
                      <TableCell>40</TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.primx_flow_dosage_liters}
                      </TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.primx_steel_fibers_dosage_kgs}
                      </TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.primx_cpea_dosage_liters}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Total Amount:</b></TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_dc_total_amount_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_flow_total_amount_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_steel_fibers_total_amount_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_ultracure_blankets_total_amount_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_cpea_total_amount_needed}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Packaging Capacity:</b></TableCell>
                      <TableCell>1,250</TableCell>
                      <TableCell>1,000</TableCell>
                      <TableCell>19,200</TableCell>
                      <TableCell>600</TableCell>
                      <TableCell>1,000</TableCell>
                      <TableCell></TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Packages Needed:</b></TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_dc_packages_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_flow_packages_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_steel_fibers_packages_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_ultracure_blankets_packages_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_cpea_packages_needed}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Total Order Quantity:</b></TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_dc_total_order_quantity}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_flow_total_order_quantity}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_steel_fibers_total_order_quantity}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_ultracure_blankets_total_order_quantity}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_cpea_total_order_quantity}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Materials Price:</b></TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_dc_unit_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_flow_unit_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_steel_fibers_unit_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_ultracure_blankets_unit_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_cpea_unit_price}</TableCell>
                      <TableCell><b>Totals:</b></TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Total Materials Price:</b></TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_dc_total_materials_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_flow_total_materials_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_steel_fibers_total_materials_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_ultracure_blankets_total_materials_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_cpea_total_materials_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.design_total_materials_price}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Containers:</b></TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_dc_containers_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_flow_containers_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_steel_fibers_containers_needed}</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_cpea_containers_needed}</TableCell>
                      <TableCell>
                        {/* // Total number of containers go into this cell */}
                        {/* {calculatedDisplayObject?.primx_dc_containers_needed + calculatedDisplayObject?.primx_flow_containers_needed +
                          calculatedDisplayObject?.primx_steel_fibers_containers_needed + calculatedDisplayObject?.primx_cpea_containers_needed} */}
                        {calculatedDisplayObject?.design_total_containers}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Shipping Estimate:</b></TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_dc_calculated_shipping_estimate}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_flow_calculated_shipping_estimate}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_steel_fibers_calculated_shipping_estimate}</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_cpea_calculated_shipping_estimate}</TableCell>
                      <TableCell>{calculatedDisplayObject?.design_total_shipping_estimate}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Total Cost:</b></TableCell>
                      <TableCell><b>{calculatedDisplayObject?.primx_dc_total_cost_estimate}</b></TableCell>
                      <TableCell><b>{calculatedDisplayObject?.primx_flow_total_cost_estimate}</b></TableCell>
                      <TableCell><b>{calculatedDisplayObject?.primx_steel_fibers_total_cost_estimate}</b></TableCell>
                      <TableCell><b>{calculatedDisplayObject?.primx_ultracure_blankets_total_cost_estimate}</b></TableCell>
                      <TableCell><b>{calculatedDisplayObject?.primx_cpea_total_cost_estimate}</b></TableCell>
                      <TableCell><b>{calculatedDisplayObject?.design_total_price_estimate}</b></TableCell>
                    </TableRow>

                    <TableRow>
                      {/* <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>

                      <TableCell colSpan={3} align="right">
                        <Button
                          type="submit"
                          onClick={event => handleCalculateCosts(event)}
                          variant="contained"
                          style={{ fontFamily: 'Lexend Tera', fontSize: '11px' }}
                          color="primary"
                        >
                          Calculate Costs
                        </Button>
                      </TableCell> */}
                      <TableCell colSpan={11} align="right">
                        {/* <Button
                          // type="submit"
                          onClick={event => handleCalculateCosts(event)}
                          variant="contained"
                          className={classes.LexendTeraFont11}
                          color="primary"
                        >
                          Calculate Costs
                        </Button>
                        &nbsp; &nbsp; */}
                        <Button
                          type="submit"
                          // ⬇⬇⬇⬇ COMMENT THIS CODE IN/OUT FOR FORM VALIDATION:
                          // onClick={event => handleSave(event)}
                          variant="contained"
                          className={classes.LexendTeraFont11}
                          color="secondary"
                        >
                          Save Estimate
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
    </>
  )
}
