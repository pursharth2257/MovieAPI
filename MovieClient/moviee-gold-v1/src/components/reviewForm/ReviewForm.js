import { Form, Button } from 'react-bootstrap';

const ReviewForm = ({ handleSubmit, revText, labelText }) => {
    const onSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const reviewBody = revText.current.value; // Get the review text
        handleSubmit(reviewBody); // Pass the review text to the parent
    };

    return (
        <Form onSubmit={onSubmit}> {/* Attach the onSubmit event handler */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{labelText}</Form.Label>
                <Form.Control ref={revText} as="textarea" rows={3} />
            </Form.Group>
            <Button variant="outline-info" type="submit"> {/* Set the type to submit */}
                Submit
            </Button>
        </Form>
    );
};

export default ReviewForm;