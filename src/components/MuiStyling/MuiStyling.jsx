import { makeStyles, createMuiTheme, withStyles, TableCell, TableRow } from '@material-ui/core';


// ⬇ Material-ui Theme: 
const theme = createMuiTheme({
  // Changes the font default of MUI Components to be on-brand font: 
  typography: {
    fontFamily: 'Lexend Tera',
    fontSize: 11
  },
}) // End theme


// const StyledTableCell = withStyles((theme) => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   }
// }))(TableCell);


// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     '&:nth-of-type(odd)': {
//       backgroundColor: theme.palette.action.hover,
//     },
//   },
// }))(TableRow);


// ⬇ Material-ui Classes: 
const useStyles = makeStyles({
  // ⬇ Makes the Hamburger Icon White and Large:
  navBarIcon: {
    color: 'white',
    fontSize: '1.75em'
  },
  // ⬇ Makes the Data Grid Tables in a normal font: 
  dataGridTables: {
    fontFamily: 'Times New Roman',
    fontSize: '1em',
  },
}); // End useStyles


export { useStyles, theme };
