import React, {useState} from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const MovieInfos = (movieTitle, movieOverview,movieImg, movieDetails,movieReleaseDate,movieRatings) => {
    const [show, setShowDetails] = useState(false);
    console.log(movieTitle.movieTitle)
    return (
        <div>
        <Modal isOpen={movieTitle.show} toggle={() => setShowDetails(!movieTitle.show)} className="modal">
        <ModalHeader toggle={() => setShowDetails(!show)}>{movieTitle.movieTitle}</ModalHeader>
        <ModalBody>
            {movieTitle.movieImg}
            <p>Description : </p>
            {movieTitle.movieOverview}
            <p>Release Date : </p>
            {movieTitle.movieReleaseDate}
            <p></p>
            {movieTitle.movieRatings}
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={() => setShowDetails(!movieTitle.show)}>Do Something</Button>{' '}
            <Button color="secondary" onClick={() => setShowDetails(!movieTitle.show)}>Back to search results</Button>
        </ModalFooter>
        </Modal>
    </div>
    );

}

export default MovieInfos