import { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
        fetchReviews(); // Fetch reviews when the component mounts
    }, [movieId]);

    // Function to fetch reviews from the API
    const fetchReviews = async () => {
        try {
            const response = await api.get(`/api/v1/reviews?imdbId=${movieId}`); // Adjust the endpoint if necessary
            setReviews(response.data); // Assuming response.data is the array of reviews
        } catch (err) {
            console.error(err);
        }
    };

    const addReview = async (reviewBody) => { // Now receives reviewBody directly
        if (!reviewBody || reviewBody.trim() === "") {
            // Optionally, show an error message to the user
            console.error("Review cannot be empty");
            return; // Exit the function if the review body is empty
        }

        try {
            await api.post('/api/v1/reviews', { reviewBody, imdbId: movieId });
            await fetchReviews(); // Fetch reviews again after adding a new one
            revText.current.value = "";

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    {reviews?.map((r, index) => (
                        <div key={index}>
                            <Row>
                                <Col>{r.body}</Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </div>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    );
};

export default Reviews;