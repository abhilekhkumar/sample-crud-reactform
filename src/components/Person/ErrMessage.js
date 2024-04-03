import Toast from "react-bootstrap/Toast";
export default function ErrMessage(msg) {
  return (
    <Toast>
      <Toast.Header>
        <i
          class="fa fa-exclamation-triangle"
          aria-hidden="true"
        ></i>
        <strong className="me-auto">
          Error Occured During Form Submission
        </strong>
        <small>Just Now</small>
      </Toast.Header>
      <Toast.Body>{msg}</Toast.Body>
    </Toast>
  );
}
