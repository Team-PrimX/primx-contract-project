//#region ⬇⬇ All document setup, below:
// ⬇ File Imports: 
// ⬇ Dependent Functionality:
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useEstimateCalculations from '../../hooks/useEstimateCalculations';
import { Button, MenuItem, TextField, InputLabel, Select, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, InputAdornment } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useStyles } from '../MuiStyling/MuiStyling';
import LicenseeHomePage from '../LicenseeHomePage/LicenseeHomePage';

//#endregion ⬆⬆ All document setup above.


export default function ImperialTable() {
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
  const productsReducer = useSelector(store => store.products);
  const [calculatedDisplayObject, setCalculatedDisplayObject] = useState({});

  // ⬇ GET on page load:
  // useEffect(() => {
  //   // Product Call
  //   dispatch({ type: 'FETCH_PRODUCTS' }),
  //     // State/Province Call
  //     dispatch({ type: 'FETCH_SHIPPING_COSTS' })
  // }, []);
  //#endregion ⬆⬆ All state variables above. 


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
    console.log('In Imperial handleSave');
    // ⬇ Don't refresh until submit:
    event.preventDefault();
    // // ⬇ Sending newPlant to our reducer: 
    // dispatch({ type: 'ADD_NEW_KIT', payload: newKit });
    // // ⬇ Send the user back:
    // history.push('/dashboard');
  } // End handleSubmit

  const handleCalculateCosts = () => {
    console.log('In Imperial handleCalculateCosts');
    const calculatedObject = calculateEstimate(estimateData)
    setCalculatedDisplayObject(calculatedObject)
    console.log('***CALCULATED OBJECT****', calculatedObject);
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
          
          <Grid item xs={6}>
            <Paper elevation={3}>
              <TableContainer>
                <h3 className="lexendFont">Project Quantity Calculations</h3>
                <Table size="small">
                  <TableBody>

                    <TableRow>
                      <TableCell><b>Square Feet:</b></TableCell>
                      <TableCell>
                        <TextField
                          onChange={event => handleChange('square_feet', event.target.value)}
                          required
                          type="number"
                          size="small"
                          fullWidth
                          InputProps={{
                            startAdornment: <InputAdornment position="start">ft²</InputAdornment>,
                          }}
                          defaultValue={estimateData.square_feet}
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Thickness (in):</b></TableCell>
                      <TableCell>
                        <TextField
                          onChange={event => handleChange('thickness_inches', event.target.value)}
                          required
                          type="number"
                          size="small"
                          fullWidth
                          InputProps={{
                            startAdornment: <InputAdornment position="start">in</InputAdornment>,
                          }}
                          defaultValue={estimateData.thickness_inches}
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Cubic Yards:</b></TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.cubic_yards}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Thickening @ Perimeter (yd³):</b></TableCell>
                      <TableCell>
                        {/* This rounds down in the spreadsheet, and rounds up here: */}
                        {calculatedDisplayObject?.perimeter_thickening_cubic_yards}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Thickening @ Construction Joints (yd³):</b></TableCell>
                      <TableCell>
                        {/* This rounds down in the spreadsheet, and rounds up here: */}
                        {calculatedDisplayObject?.construction_joint_thickening_cubic_yards}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Subtotal:</b></TableCell>
                      <TableCell>
                        {/* This rounds down in the spreadsheet, and rounds up here: */}
                        {calculatedDisplayObject?.cubic_yards_subtotal}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Waste Factor @ 5%:</b></TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.waste_factor_cubic_yards}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Total Cubic Yards:</b></TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.design_cubic_yards_total}
                      </TableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper elevation={3}>
              <TableContainer>

                <h3 className="lexendFont">Thickened Edge Calculator</h3>
                <p>If applicable, for slabs under 6in.<br />Note: For 'Slab on Insulation', enter "0" for both.</p>
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
                      <TableCell><b>Lineal Feet:</b></TableCell>
                      <TableCell>
                        <TextField
                          onChange={event => handleChange('thickened_edge_perimeter_lineal_feet', event.target.value)}
                          required
                          type="number"
                          size="small"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">ft</InputAdornment>,
                          }}
                          fullWidth
                          defaultValue={estimateData.thickened_edge_perimeter_lineal_feet}
                        // defaultValue="0"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          onChange={event => handleChange('thickened_edge_construction_joint_lineal_feet', event.target.value)}
                          required
                          type="number"
                          size="small"
                          fullWidth
                          InputProps={{
                            startAdornment: <InputAdornment position="start">ft</InputAdornment>,
                          }}
                          defaultValue={estimateData.thickened_edge_construction_joint_lineal_feet}
                        // defaultValue="0"
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Width (yd³):</b></TableCell>
                      <TableCell>
                        5
                      </TableCell>
                      <TableCell>
                        10
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Additional Thickness (in):</b></TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.additional_thickness_inches}
                      </TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.additional_thickness_inches}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>Cubic Yards:</b></TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.perimeter_thickening_cubic_yards}
                      </TableCell>
                      <TableCell>
                        {calculatedDisplayObject?.construction_joint_thickening_cubic_yards}
                      </TableCell>
                    </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3}>
              <TableContainer>
                <h3 className="lexendFont">Materials Table</h3>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell><b>Dosage<br />Rate<br />(per yd³)</b></TableCell>
                      <TableCell><b>Total<br />Amount</b></TableCell>
                      <TableCell><b>Packaging<br />Capacity</b></TableCell>
                      <TableCell><b>Packages<br />Needed</b></TableCell>
                      <TableCell><b>Total<br />Order<br />Quantity</b></TableCell>
                      <TableCell><b>Materials<br />Price</b></TableCell>
                      <TableCell><b>Total<br />Materials<br />Price</b></TableCell>
                      <TableCell><b>Containers</b></TableCell>
                      <TableCell><b>Shipping<br />Estimate</b></TableCell>
                      <TableCell><b>Total<br />Cost</b></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell><b>PrīmX DC (lbs)</b></TableCell>
                      <TableCell>67</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_dc_total_amount_needed}</TableCell>
                      <TableCell>2,756</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_dc_packages_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_dc_total_order_quantity}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_dc_unit_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_dc_total_materials_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_dc_containers_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_dc_calculated_shipping_estimate}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_dc_total_cost_estimate}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>PrīmX Flow (ltrs)</b></TableCell>
                      <TableCell style={{ width: '1em' }}>
                        <TextField
                          onChange={event => handleChange('primx_flow_dosage_liters', event.target.value)}
                          required
                          type="number"
                          size="small"
                          fullWidth
                          defaultValue={estimateData.primx_flow_dosage_liters}
                        />
                      </TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_flow_total_amount_needed}</TableCell>
                      <TableCell>1,000</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_flow_packages_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_flow_total_order_quantity}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_flow_unit_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_flow_total_materials_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_flow_containers_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_flow_calculated_shipping_estimate}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_flow_total_cost_estimate}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>PrīmX Steel Fibers (lbs)</b></TableCell>
                      <TableCell style={{ width: '1em' }}>
                        <TextField
                          onChange={event => handleChange('primx_steel_fibers_dosage_lbs', event.target.value)}
                          required
                          type="number"
                          size="small"
                          fullWidth
                          defaultValue={estimateData.primx_steel_fibers_dosage_lbs}
                        />
                      </TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_steel_fibers_total_amount_needed}</TableCell>
                      <TableCell>42,329</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_steel_fibers_packages_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_steel_fibers_total_order_quantity}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_steel_fibers_unit_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_steel_fibers_total_materials_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_steel_fibers_containers_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_steel_fibers_calculated_shipping_estimate}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_steel_fibers_total_cost_estimate}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>PrīmX UltraCure Blankets (ft²)</b></TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_ultracure_blankets_total_amount_needed}</TableCell>
                      <TableCell>6,458</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_ultracure_blankets_packages_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_ultracure_blankets_total_order_quantity}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_ultracure_blankets_unit_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_ultracure_blankets_total_materials_price}</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>N/A</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_ultracure_blankets_total_cost_estimate}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell><b>PrīmX CPEA (ltrs)</b></TableCell>
                      <TableCell style={{ width: '1em' }}>
                        <TextField
                          onChange={event => handleChange('primx_cpea_dosage_liters', event.target.value)}
                          required
                          type="number"
                          size="small"
                          fullWidth
                          defaultValue={estimateData.primx_cpea_dosage_liters}
                        />
                      </TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_cpea_total_amount_needed}</TableCell>
                      <TableCell>1,000</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_cpea_packages_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_cpea_total_order_quantity}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_cpea_unit_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_cpea_total_materials_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_cpea_containers_needed}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_cpea_calculated_shipping_estimate}</TableCell>
                      <TableCell>{calculatedDisplayObject?.primx_cpea_total_cost_estimate}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell><b>TOTALS:</b></TableCell>
                      <TableCell>{calculatedDisplayObject?.design_total_materials_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.design_total_container_price}</TableCell>
                      <TableCell>{calculatedDisplayObject?.design_total_shipping_estimate}</TableCell>
                      <TableCell>{calculatedDisplayObject?.design_total_price_estimate}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={11} align="right">
                        <Button
                          type="submit"
                          onClick={event => handleCalculateCosts(event)}
                          variant="contained"
                          className={classes.LexendTeraFont11}
                          color="primary"
                        >
                          Calculate Costs
                        </Button>
                        &nbsp; &nbsp;
                        <Button
                          // type="submit"
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
