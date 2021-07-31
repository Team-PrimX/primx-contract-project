import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

//components
import AdminUpdates from './AdminUpdates';
import UpdateFloorTypesGrid from './UpdateFloorTypesGrid.jsx';
import UpdatePlacementTypesGrid from './UpdatePlacementTypesGrid'; 

//imports for MUI
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


export default function AdminUpdateTypes() {

  const dispatch = useDispatch();

  //defining states for sending data to server
  let [newFloorType, setNewFloorType] = useState('');
  let [newPlacementType, setNewPlacementType] = useState('');
  // establish snackbar variables for notifications
  const snack = useSelector(store => store.snackBar);

  //useSelector for array of floor types
  const floorTypes = useSelector(store => store.floorTypes);
  const placementTypes = useSelector(store => store.placementTypes);


   //styles for MUI
   const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  //defining classes for MUI
  const classes = useStyles();

  //the following handle...change functions set the floor type and placement type useStates
  const handleFloorChange = (event) => {
    setNewFloorType(event.target.value);
  }
  const handlePlacementChange = (event) => {
    setNewPlacementType(event.target.value);
  }

  const addFloorType = () => {
    if (newFloorType == '') {
      //error shows if a field is empty
      dispatch({type: 'SET_EMPTY_ERROR'})
    } else {
      //sends newFloorType to reducer to add floor type to DB
    dispatch({type: "ADD_FLOOR_TYPE", payload: {floor_type: newFloorType}})
    //empty input field after it is submitted
    setNewFloorType('')
    }
  }

  const addPlacementType = () => {
    if (newPlacementType == '') {
            //error shows if a field is empty
      dispatch({type: 'SET_EMPTY_ERROR'})
    } else {
            //sends newPlacementType to reducer to add floor type to DB
    dispatch({type: "ADD_PLACEMENT_TYPE", payload: {placement_type: newPlacementType}})
        //empty input field after it is submitted
    setNewPlacementType('')
    }
  }
  //sets snack bar notification to closed after appearing
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({type: 'SET_CLOSE'})
  };


  useEffect(() => {
    // GET floor and placement types data on page load
    dispatch({type: 'FETCH_FLOOR_TYPES'});
    dispatch({type: 'FETCH_PLACEMENT_TYPES'});
  }, [])

  console.log('floorTypes -->', floorTypes);

  return (
    <div>
      <AdminUpdates />
      <h4>Update Floor Types</h4>

        {/* input nd add button for adding new floor types */}
        <div style={{margin: '0 auto'}}>
          <form  className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Add New Floor Type" variant="outlined" value={newFloorType} onChange={handleFloorChange}/>
            <Fab className={classes.root} onClick={addFloorType} color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </form>
        </div>
      {/* showing floor types */}
      <UpdateFloorTypesGrid floorTypes={floorTypes}/>

      <h4>Update Placement Types</h4>
        {/* input and add button for adding new placement types */}
        <div style={{margin: '0 auto'}}>
          <form  className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Add New Placement Type" variant="outlined" value={newPlacementType} onChange={handlePlacementChange}/>
              <Fab className={classes.root} onClick={addPlacementType} color="primary" aria-label="add">
                <AddIcon />
              </Fab>
          </form>
        </div>
      {/* showing placement types */}
      <UpdatePlacementTypesGrid placementTypes={placementTypes}/>
      {/* snackbar to confirm when a floor or placement type has been added */}
      <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
