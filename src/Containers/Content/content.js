import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./content.css";

const Content = () => {
    const [user, setUser] = useState();
    const [fetchUsers, setFetchUsers] = useState();
    
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("loggedUser")));
        console.log(localStorage);

        const fetchUsers = async () => {
            try {
              const result = await fetch('http://localhost:8081/getAllGUser');
              setFetchUsers(await result.json());
  
            } catch (error) {
              console.log(error)
            }
        };

        fetchUsers();
    },[]);

    function checkContent(){
        const inputContent = document.getElementById("inputContent").value
        switch(inputContent){
            case "Movie":
                document.querySelector(".container-box_addMovie").style.display = "block";
                document.querySelector(".container-box_addDoc").style.display = "none";
                document.querySelector(".container-box_addSeries").style.display = "none";
                break;
            case "TV Series":
                document.querySelector(".container-box_addSeries").style.display = "block";
                document.querySelector(".container-box_addMovie").style.display = "none";
                document.querySelector(".container-box_addDoc").style.display = "none";
                break;
            case "Documentary":
                document.querySelector(".container-box_addDoc").style.display = "block";
                document.querySelector(".container-box_addMovie").style.display = "none";
                document.querySelector(".container-box_addSeries").style.display = "none";
                break;
            default:
                document.querySelector(".container-box_addDoc").style.display = "none";
                document.querySelector(".container-box_addMovie").style.display = "none";
                document.querySelector(".container-box_addSeries").style.display = "none";
        }
    }

    const submitMovie = () => {
        const name_movie = document.getElementById("name_movie").value;
        const original_language_movie = document.getElementById("original_language_movie").value;
        const release_date_movie = document.getElementById("release_date_movie").value;
        const trailer_movie = document.getElementById("trailer_movie").value;
        const backdrop_path_movie = document.getElementById("backdrop_path_movie").value;
        const poster_path_movie = document.getElementById("poster_path_movie").value;
        const vote_average_movie = document.getElementById("vote_average_movie").value;
        const adult_movie = document.getElementById("adult_movie").value;
        const overview_movie = document.getElementById("overview_movie").value;
        const watch_time_movie = document.getElementById("watch_time_movie").value;

        const genres = [];

        if(document.getElementById("adventure_movie").checked){
            genres.push("Adventure");
        }
        if(document.getElementById("action_movie").checked){
            genres.push("Action");
        }
        if(document.getElementById("drama_movie").checked){
            genres.push("Drama");
        }
        if(document.getElementById("sci_fi_movie").checked){
            genres.push("Sci Fi");
        }
        if(document.getElementById("crime_movie").checked){
            genres.push("Crime");
        }
        if(document.getElementById("horror_movie").checked){
            genres.push("Horror");
        }

        const saveMovie = async () => {
            fetch('http://localhost:8081/addMovie',{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: name_movie,
                overview: overview_movie,
                genres: genres,
                backdrop_path: backdrop_path_movie,
                poster_path: poster_path_movie,
                adult: adult_movie,
                original_language: original_language_movie,
                release_date: release_date_movie,
                vote_average: vote_average_movie,
                trailer: trailer_movie,
                watch_time: watch_time_movie
              })
            })
        }

        const sendContentEmail = () => {
            if (!fetchUsers) return;
        
            const emailPromises = fetchUsers.map(user => {
                return fetch(`http://localhost:8081/contentUpdate/${user.email}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        subject: "New Movie Uploaded",
                        name: user.name,
                        nameContent: name_movie,
                        content: "Movie",
                        overview: overview_movie,
                        original_language: original_language_movie,
                        release_date: release_date_movie,
                        vote_average: vote_average_movie,
                        trailer: trailer_movie,
                    })
                });
            });
        
            Promise.all(emailPromises)
                .then(responses => {
                    // handle responses if needed
                    console.log("All emails sent successfully");
                })
                .catch(error => {
                    console.error("Error sending emails:", error);
                });
        };

        saveMovie();
        sendContentEmail();

        alert("Successfully added the Movie");
        
        window.location.reload();
    }

    const submitSeries = () => {
        var name_series = document.getElementById("name_series").value;
        var original_language_series = document.getElementById("original_language_series").value;
        var release_date_series = document.getElementById("release_date_series").value;
        var trailer_series = document.getElementById("trailer_series").value;
        var backdrop_path_series = document.getElementById("backdrop_path_series").value;
        var poster_path_series = document.getElementById("poster_path_series").value;
        var vote_average_series = document.getElementById("vote_average_series").value;
        var adult_series = document.getElementById("adult_series").value;
        var overview_series = document.getElementById("overview_series").value;
        var num_of_seasons = document.getElementById("num_of_seasons").value;
        var num_of_episodes = document.getElementById("num_of_episodes").value;

        const genres = [];

        if(document.getElementById("adventure_series").checked){
            genres.push("Adventure");
        }
        if(document.getElementById("action_series").checked){
            genres.push("Action");
        }
        if(document.getElementById("drama_series").checked){
            genres.push("Drama");
        }
        if(document.getElementById("sci_fi_series").checked){
            genres.push("Sci Fi");
        }
        if(document.getElementById("crime_series").checked){
            genres.push("Crime");
        }
        if(document.getElementById("horror_series").checked){
            genres.push("Horror");
        }

        const saveSeries = async () => {
            fetch('http://localhost:8081/addSeries',{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: name_series,
                overview: overview_series,
                genres: genres,
                backdrop_path: backdrop_path_series,
                poster_path: poster_path_series,
                adult: adult_series,
                original_language: original_language_series,
                release_date: release_date_series,
                vote_average: vote_average_series,
                trailer: trailer_series,
                num_of_seasons: num_of_seasons,
                num_of_episodes: num_of_episodes
              })
            })
        }

        const sendContentEmail = () => {
            if (!fetchUsers) return;
            
        
            const emailPromises = fetchUsers.map(user => {
                return fetch(`http://localhost:8081/contentUpdate/${user.email}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        subject: "New Series Uploaded",
                        name: user.name,
                        nameContent: name_series,
                        content: "Series",
                        overview: overview_series,
                        original_language: original_language_series,
                        release_date: release_date_series,
                        vote_average: vote_average_series,
                        trailer: trailer_series,
                    })
                });
            });
        
            Promise.all(emailPromises)
                .then(responses => {
                    // handle responses if needed
                    console.log("All emails sent successfully");
                })
                .catch(error => {
                    console.error("Error sending emails:", error);
                });
        };

        saveSeries();
        sendContentEmail();
        
        alert("Successfully added the TV Series");

        window.location.reload();
    }

    const submitDoc = () => {
        const name_doc = document.getElementById("name_doc").value;
        const original_language_doc = document.getElementById("original_language_doc").value;
        const release_date_doc = document.getElementById("release_date_movie").value;
        const trailer_doc = document.getElementById("trailer_doc").value;
        const backdrop_path_doc = document.getElementById("backdrop_path_doc").value;
        const poster_path_doc = document.getElementById("poster_path_doc").value;
        const vote_average_doc = document.getElementById("vote_average_doc").value;
        const adult_doc = document.getElementById("adult_doc").value;
        const overview_doc = document.getElementById("overview_doc").value;
        const watch_time_doc = document.getElementById("watch_time_doc").value;

        const genres = [];

        if(document.getElementById("adventure_doc").checked){
            genres.push("Adventure");
        }
        if(document.getElementById("action_doc").checked){
            genres.push("Action");
        }
        if(document.getElementById("drama_doc").checked){
            genres.push("Drama");
        }
        if(document.getElementById("sci_fi_doc").checked){
            genres.push("Sci Fi");
        }
        if(document.getElementById("crime_doc").checked){
            genres.push("Crime");
        }
        if(document.getElementById("horror_doc").checked){
            genres.push("Horror");
        }

        const saveDoc = async () => {
            fetch('http://localhost:8081/addDoc',{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: name_doc,
                overview: overview_doc,
                genres: genres,
                backdrop_path: backdrop_path_doc,
                poster_path: poster_path_doc,
                adult: adult_doc,
                original_language: original_language_doc,
                release_date: release_date_doc,
                vote_average: vote_average_doc,
                trailer: trailer_doc,
                watch_time: watch_time_doc
              })
            })
        }

        const sendContentEmail = () => {
            if (!fetchUsers) return;
            
        
            const emailPromises = fetchUsers.map(user => {
                return fetch(`http://localhost:8081/contentUpdate/${user.email}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        subject: "New Documentary Uploaded",
                        name: user.name,
                        nameContent: name_doc,
                        content: "Documentary",
                        overview: overview_doc,
                        original_language: original_language_doc,
                        release_date: release_date_doc,
                        vote_average: vote_average_doc,
                        trailer: trailer_doc,
                    })
                });
            });
        
            Promise.all(emailPromises)
                .then(responses => {
                    // handle responses if needed
                    console.log("All emails sent successfully");
                })
                .catch(error => {
                    console.error("Error sending emails:", error);
                });
        };

        saveDoc();
        sendContentEmail();

        alert("Successfully added the Documentary");
        
        window.location.reload();
    }

    return(
        <div className="wrapper__content">
            <Navbar/>
            <div className="content_container">
                <h1>Welcome <span>{user?.name || "guest"}</span></h1>
                <div className="container-box">
                    <label>Choose the content</label><br></br>
                    <select id="inputContent" onChange={checkContent}>
                        <option>Check one of content</option>
                        <option>Movie</option>
                        <option>TV Series</option>
                        <option>Documentary</option>
                    </select>
                    <div className="container-box_addMovie">
                        <form>
                            <table className="addMovie-outerTable">
                                <tr>
                                    <table className="addMovie-innerTable">
                                        <tr>
                                            <td>
                                                <label>Movie name</label><br></br>
                                                <input type="text" id="name_movie" requirede></input>
                                            </td>
                                            <td>
                                                <label>Language</label><br></br>
                                                <input type="text" id="original_language_movie" required></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Release Date</label><br></br>
                                                <input type="text" id="release_date_movie"required></input>
                                            </td>
                                            <td>
                                                <label>Trailer</label><br></br>
                                                <input type="text" id="trailer_movie" required></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Backdrop path</label><br></br>
                                                <input type="text" id="backdrop_path_movie" required></input>
                                            </td>
                                            <td>
                                                <label>Poster Path</label><br></br>
                                                <input type="text" id="poster_path_movie" required></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Watch Time</label><br></br>
                                                <input type="text" id="watch_time_movie" required></input>
                                            </td>
                                            <td>
                                                <label>Vote Average</label><br></br>
                                                <input type="text" id="vote_average_movie" required></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <label>Adult</label><br></br>
                                                <select id="adult_movie">
                                                    <option selected value="choose">Choose True or False</option>
                                                    <option value="true">True</option>
                                                    <option value="false">False</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <br></br>
                                            <label className="genreLabel">Genres</label><br></br><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="adventure_movie" value="Adventure"/><label>Adventure</label><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="action_movie" value="Action"/><label>Action</label><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="drama_movie" value="Drama"/><label>Drama</label><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="sci_fi_movie" value="Sci Fi"/><label>Sci Fi</label><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="crime_movie" value="Crime"/><label>Crime</label><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="horror_movie" value="Horror"/><label>Horror</label><br></br>
                                            </td>
                                        </tr>
                                    </table>
                                </tr>
                                <tr>
                                    <br></br>
                                    <label>Overview</label><br></br>
                                    <textarea id="overview_movie"></textarea>
                                </tr>
                            </table>
                            <input type="button" id="button_movie" value="Add Movie" onClick={submitMovie}></input>
                        </form>
                    </div>
                    <div className="container-box_addSeries">
                    <form>
                            <table className="addMovie-outerTable">
                                <tr>
                                    <table className="addMovie-innerTable">
                                        <tr>
                                            <td>
                                                <label>TV Series name</label><br></br>
                                                <input type="text" id="name_series" requirede></input>
                                            </td>
                                            <td>
                                                <label>Language</label><br></br>
                                                <input type="text" id="original_language_series" required></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Release Date</label><br></br>
                                                <input type="text" id="release_date_series"required></input>
                                            </td>
                                            <td>
                                                <label>Trailer</label><br></br>
                                                <input type="text" id="trailer_series" required></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Backdrop path</label><br></br>
                                                <input type="text" id="backdrop_path_series" required></input>
                                            </td>
                                            <td>
                                                <label>Poster Path</label><br></br>
                                                <input type="text" id="poster_path_series" required></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Vote Average</label><br></br>
                                                <input type="text" id="vote_average_series" required></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Number of Seasons</label><br></br>
                                                <input type="number" id="num_of_seasons" required></input>
                                            </td>
                                            <td>
                                                <label>Number of Episodes</label><br></br>
                                                <input type="number" id="num_of_episodes" required></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <label>Adult</label><br></br>
                                                <select id="adult_series">
                                                <option selected value="choose">Choose True or False</option>
                                                    <option value="true">True</option>
                                                    <option value="false">False</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                        <td>
                                            <br></br>
                                            <label className="genreLabel">Genres</label><br></br><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="adventure_series" value="Adventure"/><label>Adventure</label><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="action_series" value="Action"/><label>Action</label><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="drama_series" value="Drama"/><label>Drama</label><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="sci_fi_series" value="Sci Fi"/><label>Sci Fi</label><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="crime_series" value="Crime"/><label>Crime</label><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="horror_series" value="Horror"/><label>Horror</label><br></br>
                                            </td>
                                        </tr>
                                    </table>
                                </tr>
                                <tr>
                                    <br></br>
                                    <label>Overview</label><br></br>
                                    <textarea id="overview_series"></textarea>
                                </tr>
                            </table>
                            <input type="button" id="button_series" value="Add Series" onClick={submitSeries}></input>
                        </form>
                    </div>
                    <div className="container-box_addDoc">
                    <form>
                            <table className="addMovie-outerTable">
                                <tr>
                                    <table className="addMovie-innerTable">
                                        <tr>
                                            <td>
                                                <label>Document name</label><br></br>
                                                <input type="text" id="name_doc" requirede></input>
                                            </td>
                                            <td>
                                                <label>Language</label><br></br>
                                                <input type="text" id="original_language_doc" required></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Release Date</label><br></br>
                                                <input type="text" id="release_date_doc"required></input>
                                            </td>
                                            <td>
                                                <label>Trailer</label><br></br>
                                                <input type="text" id="trailer_doc" required></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Backdrop path</label><br></br>
                                                <input type="text" id="backdrop_path_doc" required></input>
                                            </td>
                                            <td>
                                                <label>Poster Path</label><br></br>
                                                <input type="text" id="poster_path_doc" required></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label>Watch Time</label><br></br>
                                                <input type="text" id="watch_time_doc" required></input>
                                            </td>
                                            <td>
                                                <label>Vote Average</label><br></br>
                                                <input type="text" id="vote_average_doc" required></input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <label>Adult</label><br></br>
                                                <select id="adult_doc">
                                                    <option selected value="choose">Choose True or False</option>
                                                    <option value="true">True</option>
                                                    <option value="false">False</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <br></br>
                                            <label className="genreLabel">Genres</label><br></br><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="adventure_doc" value="Adventure"/><label>Adventure</label><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="action_doc" value="Action"/><label>Action</label><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="drama_doc" value="Drama"/><label>Drama</label><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="sci_fi_doc" value="Sci Fi"/><label>Sci Fi</label><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="crime_doc" value="Crime"/><label>Crime</label><br></br>
                                            <input className="checkInput" type="checkbox" name="genre" id="horror_doc" value="Horror"/><label>Horror</label><br></br>
                                            </td>
                                        </tr>
                                    </table>
                                </tr>
                                <tr>
                                    <br></br>
                                    <label>Overview</label><br></br>
                                    <textarea id="overview_doc"></textarea>
                                </tr>
                            </table>
                            <input type="button" id="button_doc" value="Add Documentary" onClick={submitDoc}></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;