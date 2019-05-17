import React,{ useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Style from "./movie.module.css";

const Movie= ({title,img,overview,movieLink,releaseDate,ratings, genres, matchingGenres}) => {
    const [showDetails, setShowDetails] = useState(false);
    const getMovieDetails = () => {
        window.location.href = movieLink;
    }
    // const getMatchingGenres = () => {
    //     genres.map(genre => {
    //         console.log(matchingGenres.find(() => {console.log(genre == matchingGenres.id))))
    //     })
    // }
    console.log(genres)
    console.log(matchingGenres)
    return (

            <div className={Style.movie}>
                <h1>{title}</h1>
                <p>{overview}</p>
                <img src={img} alt="" className={Style.image} />
                <input type="button" value="View Details" className={Style.button} onClick={() => setShowDetails(!showDetails)}></input>
                {

                    showDetails === true && 
                    <div>
                        <Modal isOpen={showDetails} toggle={() => setShowDetails(!showDetails)} className={Style.modal}>
                        <ModalHeader toggle={() => setShowDetails(!showDetails)}>{title}</ModalHeader>
                        <ModalBody className={Style.modal_body}>
                            <img src={img} alt=""/>
                            <p>Description : </p>
                            {overview}
                            <p className={Style.modal_paragraph}>Release Date : {releaseDate}</p>
                            <p className={Style.modal_paragraph}>Ratings : {ratings} </p>
                            <p>Genres : </p>
                            <ul>
                                {genres.map(genre => (
                                    <li>{genre}</li>
                                ))}
                            </ul>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => getMovieDetails()}>View full details</Button>{' '}
                            <Button color="secondary" onClick={() => setShowDetails(!showDetails)}>Back to search results</Button>
                        </ModalFooter>
                        </Modal>
                    </div>
                }
            </div>

    );
}

export default Movie