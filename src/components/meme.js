import React from "react";
import Memedata from "../memedata";

function Meme () {

    // const [memeImage, setMemeImage] = React.useState("");
    const [meme, setMeme] = React.useState({
        toptext: "",
        bottomtext: "",
        image: "https://i.imgflip.com/30b1gx.jpg"
    });

    const [memedata, setMemedata] = React.useState([]);

    function getMemeImage(event ) {
        event.preventDefault();   
        const memesArray = memedata.data.memes;
        const randomNumber = Math.floor(Math.random() * memesArray.length);
        const url = memesArray[randomNumber].url;
        setMeme(prev => ({
            ...prev,
            image: url
        }))
        console.log(meme);
    }


    function handle (event) {
        const {name, value} = event.target;
        setMeme(prev => ({
            ...prev,
            [name]: value
        }))
    }

     /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as se en below:
    */

    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setMemedata(data)
        }
        getMemes()
    },[])


    return(
        <main className="meme-main">
            <div className="form">
                <input 
                    className="form-input"
                    type="text" 
                    placeholder="Top text" 
                    name="toptext"
                    onChange={handle}
                    />
                <input 
                    className="form-input" 
                    type="text" 
                    placeholder="Bottom text"
                    name="bottomtext"
                    onChange={handle}
                />
                <button 
                    className="form-button" 
                    onClick={getMemeImage}>Get a new meme image 🖼
                </button>
            </div>
            
            <div className="meme">
                <img src={meme.image} className="meme-image"/>    
                <h2 className="meme--text top">{meme.toptext}</h2>
                <h2 className="meme--text bottom">{meme.bottomtext}</h2>
            </div>
        </main>
    );
};

export default Meme;