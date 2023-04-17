import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import jwt_decode from "jwt-decode";

export default function Predict() {

    const [file, setFile] = useState(null);
    const [prediction, setOutput] = useState(null);
    const [predicted, setPredicted] = useState(null);
    const [image, setImage] = useState('');
    // const [filePresent, setFilePresent] = useState(false);
    const [username, setUsername] = useState('')
    const [run, setRun] = useState(true)
    const [selectedValue, setSelectedValue] = useState('idk');


    let dataToken
    if (localStorage.getItem('token') !== null && run) {
        let token = localStorage.getItem('token')
        dataToken = jwt_decode(token)
        setRun(false)
        setUsername(dataToken.name)
    }

    // console.log(username)

    const FileChange = (e) => {
        setPredicted(false);
        const reader = new FileReader();
        const selectedFile = e.target.files[0];
        reader.onloadend = () => {
            setFile(selectedFile);
            setImage(reader.result);
        };
        reader.readAsDataURL(selectedFile);
        // if (file) {
        //     setFilePresent(filePresent => !filePresent)
        //     // 
        // }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append("image", file);
            const data = await fetch(process.env.FLASK_APP, {
                method: 'POST',
                body: formData,
            });
            const response = await data.json();
            console.log(response);
            if (response) {
                setOutput(response.prediction);
                setPredicted(true);
            } else {
                setPredicted(false);
            }
        }
        else {
            document.getElementById('filered').innerHTML = "File Could not be Found.";
        }
    };

    const imageUpload = async () => {
        setOutput(null);
        setPredicted(null)

        const imageUpload = await fetch(process.env.REACT_APP_HOST+"/uploadImage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                image,
                prediction,
                selectedValue,
            }),
        })
        const imageResponse = await imageUpload.json();
        console.log(imageResponse);
    }

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
        console.log(event.target.value);
    };

    let predictionColor = 'text-green-500';
    let predictionText = 'Uninfected';

    if (prediction >= 0.5) {
        predictionColor = 'text-red-500';
        predictionText = 'Parasitized';
    }

    return (
        <div className="bg-gray-100">
            <p className="text-center text-5xl pt-14 text-gray-400">
                Malaria Prediction
            </p>
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px] bg-white rounded-2xl">
                    {predicted ?
                        <>
                            <div className="flex flex-col items-center justify-center p-4 text-xl">
                                <img className='p-4 rounded-3xl' src={image} alt='preview' />
                                <br></br>
                                <div className="flex justify-center items-center">
                                    <p>
                                        Prediction:
                                        <div className={`${predictionColor}`}>{predictionText}</div>
                                    </p>
                                </div>
                            </div>
                            <p className="text-center text-xl">Ground Truth</p>
                            <div className="p-4 flex items-center justify-center">
                                <div className=" flex items-center justify-center">
                                    <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-600 ">
                                        <input id="bordered-radio-1" type="radio" value="yes" checked={selectedValue === 'yes'} onChange={handleRadioChange} name="bordered-radio" class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                        <label for="bordered-radio-1" class="w-full p-4 text-sm font-medium text-gray-900 dark:text-gray-500">Yes</label>
                                    </div>
                                </div>
                                <div className="px-2">
                                    <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-600 ">
                                        <input checked id="bordered-radio-2" type="radio" value="no" checked={selectedValue === 'no'} onChange={handleRadioChange} name="bordered-radio" class="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                                        <label for="bordered-radio-2" class="w-full p-4 text-sm font-medium text-gray-900 dark:text-gray-500">No</label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center pb-4">
                                <Link to="/predict" >
                                <button onClick={imageUpload}
                                    className="hover:shadow-form rounded-2xl bg-teal-400 py-3 px-8 text-center text-base font-semibold text-white outline-none" >
                                    Predict More
                                </button>
                                </Link>
                            </div>
                        </>
                        :
                        <>
                            <form
                                className="py-6 px-9"
                                onSubmit={(e) => handleFormSubmit(e)}>

                                <div className="pt-4 text-center">
                                    <label className="block text-2xl font-semibold text-gray-600 pb-8">
                                        Upload File
                                    </label>

                                    <div className="mb-8">
                                        <input type="file" name="file" id="file" className="sr-only" onChange={FileChange} />
                                        <label
                                            for="file"
                                            className="relative flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-gray-800 text-center">
                                            <div>
                                                <span className="mb-2 block text-xl font-semibold text-gray-600">
                                                    Drop files here
                                                </span>
                                                <span className="mb-2 block text-base font-medium text-gray-300">
                                                    Or
                                                </span>
                                                <span
                                                    className="inline-flex rounded-2xl border border-[#e0e0e0] py-2 px-7 text-base font-medium text-gray-600 hover:bg-gray-200"
                                                >
                                                    Browse
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        // className="hover:shadow-form w-full rounded-md bg-teal-400 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                        className="hover:shadow-form w-full rounded-2xl bg-teal-400 py-3 px-8 text-center text-base font-semibold text-white outline-none" >
                                        Predict
                                    </button>
                                </div>
                            </form>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}
