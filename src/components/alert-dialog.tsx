import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export function AlertDialog(props: {
  title: string;
  body: string;
  open: boolean;
  onApprove: () => void;
  onClose: () => void;
}) {
  return (
    <Dialog open={props?.open} onClose={props.onClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <p>{props.body}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onApprove}>DELETE</Button>
        <Button onClick={props.onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
