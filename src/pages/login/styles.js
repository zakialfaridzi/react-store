import { makeStyles } from "@material-ui/styles";
import theme from "../../config/theme";

const useStyles = makeStyles((theme) => ({
  title: {
    // color: theme.palette.primary.main,
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(6),
  },
  buttons: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(3),
  },
  forgotpassword: {
    textDecoration: "none",
  },
}));

export default useStyles;
